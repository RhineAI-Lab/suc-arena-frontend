import {proxy} from 'valtio'
import {SessionState} from "@/app/service/class/session-state";
import Api from "@/app/api/api";
import {simulateData} from "@/app/service/simulate-data";
import {isDialogType, isSpeechType, LogType} from "@/app/service/class/log-enum";
import Stage, {StageType} from "@/app/service/class/stage";
import Round from "@/app/service/class/round";

export default class DataService {

  static data: {
    rounds: Round[],
    state: SessionState
  } = proxy({
    rounds: [
      Round.StartRound(),
      Round.OverviewRound(),
    ],
    state: SessionState.Initial,
  })
  static settings: {
    characters: any[],
    resources: any[],
  } = proxy({
    characters: [],
    resources: [],
  })

  static sourceData: any[] = proxy([])
  static filterData: any[] = proxy([])

  static updating = false
  static updateInterval: any
  static updatingOne = false

  static async startUpdate(simulate: boolean = false) {
    this.updating = true
    this.updateInterval = setInterval(async () => {
      if (this.updatingOne) return
      this.updatingOne = true
      await this.update(simulate)
      this.updatingOne = false
    }, 1000)
  }

  static stopUpdate() {
    this.updating = false
    clearInterval(this.updateInterval)
  }

  static async update(simulate: boolean = false) {
    Api.get().then((res: any[]) => {
      if (!simulate) {
        for (let item of res) {
          this.checkAndAddToSourceData(item)
        }
        console.log('SOURCE DATA', this.sourceData)
        this.analysis()
      } else {
        let i = 0
        let interval = setInterval(() => {
          let num = Math.floor(Math.random() * 5) + 4
          for (let j = 0; j < num; j++) {
            if (i >= res.length) {
              this.analysis()
              clearInterval(interval)
              return
            }
            this.checkAndAddToSourceData(res[i])
            Api.data.last = res[i]['id']
            i++
          }
          this.analysis()
        }, 500)
      }
    })
  }

  static checkAndAddToSourceData(item: any) {
    let id = item['id']
    let sid = item['sid']
    let important = item.important_log == 'important_log'

    // 初步美化
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
    delete item['sid']
    delete item['important_log']
    item['important'] = important
    this.sourceData.push(item)

    // 制作详细数据
    let obj = JSON.parse(JSON.stringify(item))
    delete obj.time
    delete obj.sid
    if (type) {
      type = type.split(' ').map((item: string) => {
        return item[0].toUpperCase() + item.substring(1)
      }).join(' ')
      delete obj.log_type
    }

    this.filterData.push({
      id: sid,
      time: item.time,
      important: important,
      type: type,
      code: JSON.stringify(obj, null, 4),
    })
  }


  static simulate() {
    Api.data.sid = 'local-data-sid'
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
      const makeDataEasy = () => {
        return {
          type: type,
          id: item['id'],
          time: item['time'],
          source: item['source_character'],
          content: content,
          code: JSON.stringify(item, null, 4),
        }
      }
      if (type == undefined) {
      } else if (type === LogType.TurnChange) {
        let isSettlement = content.indexOf('Settlement') >= 0
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
      } else if (type === LogType.HumanSpeaking) {
        this.lastStage().push(makeDataEasy())
      } else if (type === LogType.HumanSpeakingResult) {
        this.lastStage().push(makeDataEasy())
      } else if (isSpeechType(type)) {
        if (content.trim().length == 0) content = 'No Data.'
        this.lastStage().push(makeDataEasy())
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
          code: JSON.stringify(item, null, 4),
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
            ],
            code: JSON.stringify(item, null, 4),
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
            ],
            code: JSON.stringify(item, null, 4),
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
          code: JSON.stringify(item, null, 4),
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
