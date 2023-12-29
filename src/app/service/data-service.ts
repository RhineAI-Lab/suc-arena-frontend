import { proxy, useSnapshot } from 'valtio'
import {SessionState} from "@/app/service/class/session-state";
import Api from "@/app/api/api";
import {simulateData} from "@/app/service/simulate-data";
import {isDialogType, isSpeechType, LogType} from "@/app/service/class/log-enum";
import Stage, {StageType} from "@/app/service/class/Stage";
import Round from "@/app/service/class/Round";

export default class DataService {

  static data: {
    rounds: Round[],
    state: SessionState
  } = proxy({
    rounds: [
      Round.OverviewRound(),
      Round.StartRound(),
    ],
    state: SessionState.Initial,
  })
  static sourceData: any[] = proxy([])
  static filterData: any[] = proxy([])

  static updating = false
  static updateInterval: any

  static startUpdate() {
    this.updating = true
    this.updateInterval = setInterval(() => {
      this.update()
    }, 1000)
  }

  static stopUpdate() {
    this.updating = false
    clearInterval(this.updateInterval)
  }

  static update() {
    Api.get().then((res: any[]) => {
      for (let item of res) {
        this.checkAndAddToSourceData(item)
      }
      console.log('SOURCE DATA', this.sourceData)
      this.analysis()
    })
  }

  static checkAndAddToSourceData(item: any) {
    let id = item['id']
    for (const dataItem of this.sourceData) {
      if (dataItem['id'] === id) {
        return
      }
    }
    let type = item['log_type']
    if (type) {
      type = type.trim().split(' ').map((item: string) => {
        return item[0].toUpperCase() + item.substring(1)
      }).join(' ')
      item['log_type'] = type
    }
    this.sourceData.push(item)

    let obj = JSON.parse(JSON.stringify(item))
    delete obj.sid
    delete obj.time
    delete obj.id
    delete obj.important_log
    if (type) {
      delete obj.log_type
    }

    if (type) {
      type = type.split(' ').map((item: string) => {
        return item[0].toUpperCase() + item.substring(1)
      }).join(' ')
      delete obj.log_type
    }

    this.filterData.push({
      id: item.id,
      time: item.time,
      important: item.important_log == 'important_log',
      type: type,
      code: JSON.stringify(obj, null, 4),
    })
  }


  static simulate() {
    Api.data.sid = 'da2569d0ca9d4b2aa2c24a8a82494041'
    let i = 0
    let interval = setInterval(() => {
      let num = Math.floor(Math.random() * 5) + 4
      for (let j = 0; j < num; j++) {
        if (i >= simulateData.length) {
          this.analysis()
          clearInterval(interval)
          return
        }
        this.checkAndAddToSourceData(simulateData[i])
        Api.data.last = simulateData[i]['id']
        i++
      }
      this.analysis()
    }, 500)
  }


  static usedIndex = -1
  static lastActionStage = ''
  static analysis() {
    for (let i = this.usedIndex + 1; i < this.sourceData.length; i++) {
      let item = this.sourceData[i]
      let type = item['log_type']
      let content = item['log_content']
      if (type == undefined) {
      } else if (type === LogType.TurnChange) {
        let isSettlement = content.indexOf('Settlement') == 0
        if (isSettlement) {
          this.data.rounds.push(Round.SettlementRound(content))
        } else {
          this.data.rounds.push(Round.NormalRound(content))
        }
      } else if (type === LogType.TurnEnd) {
        this.lastRound().finished = true
      } else if (type === LogType.StageChange) {
        let stage = Stage.create(content)
        this.lastRound().stages.push(stage)
      } else if (isSpeechType(type)) {
        if (content.trim().length == 0) content = 'No Data.'
        this.lastStage().push({
          type: type,
          id: item['id'],
          time: item['time'],
          source: item['source_character'],
          content: content,
        })
        if (type == LogType.ReflectionResult) {
          this.moveRelationUpdateBack()
        }
      } else if (isDialogType(type)) {
        if (content.trim().length == 0) content = 'No Data.'
        this.lastStage().push({
          type: type,
          id: item['id'],
          time: item['time'],
          source: item['source_character'],
          target: item['target_character'],
          content: content,
        })
      } else if (type === LogType.BeliefUpdate) {
        let stage = this.lastStage()
        let ele = undefined
        let i = stage.size() - 1
        for (; i >= 0; i--) {
          if (stage.get(i)['type'] === LogType.BeliefUpdate && stage.get(i)['source'] === item['source_character']) {
            ele = stage.get(i)
            break
          }
        }
        if (ele == undefined) {
          ele = {
            type: LogType.BeliefUpdate,
            id: item['id'],
            time: item['time'],
            source: item['source_character'],
            content: [
              {target: item['target_character'], score: content},
            ]
          }
          stage.push(ele)
        } else {
          ele.id = item['id']
          ele.time = item['time']
          ele.content.push({target: item['target_character'], score: content})
          const element = stage.messages.splice(i, 1)[0]
          stage.push(element)
        }
      } else if (type === LogType.RelationUpdate) {
        let stage = this.lastStage()
        let ele = undefined
        let i = stage.size() - 1
        for (; i >= 0; i--) {
          if (stage.get(i)['type'] === LogType.RelationUpdate) {
            ele = stage.get(i)
            break
          }
        }
        if (ele == undefined) {
          ele = {
            type: LogType.RelationUpdate,
            id: item['id'],
            time: item['time'],
            characters : [item['source_character']],
            content: [
              {source: item['source_character'], target: item['target_character'], score: content},
            ]
          }
          if (ele.characters.indexOf(item['target_character']) == -1) {
            ele.characters.push(item['target_character'])
          }
          stage.push(ele)
        } else {
          ele.id = item['id']
          ele.time = item['time']
          ele.content.push({source: item['source_character'], target: item['target_character'], score: content})
          if (ele.characters.indexOf(item['source_character']) == -1) {
            ele.characters.push(item['source_character'])
          }
          if (ele.characters.indexOf(item['target_character']) == -1) {
            ele.characters.push(item['target_character'])
          }
          this.moveRelationUpdateBack()
        }
      } else if (type === LogType.WinnerAnnouncement) {
        if (content.trim().length == 0) content = 'No Data.'
        this.lastStage().push({
          type: LogType.WinnerAnnouncement,
          id: item['id'],
          time: item['time'],
          content: content,
        })
      }
      this.usedIndex = i
    }
    console.log('Analysis finished', JSON.parse(JSON.stringify(this.data.rounds)))
  }

  static moveRelationUpdateBack() {
    let stage = this.lastStage()
    for (let i = 0; i < stage.size(); i++) {
      if (stage.get(i).type === LogType.RelationUpdate) {
        const element = stage.messages.splice(i, 1)[0]
        stage.push(element)
      }
    }
  }

  static lastRound() {
    return this.data.rounds[this.data.rounds.length - 1]
  }

  static lastStage() {
    let stages = this.lastRound().stages
    return stages[stages.length - 1]
  }

}
