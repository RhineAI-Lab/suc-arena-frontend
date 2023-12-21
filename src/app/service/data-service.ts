import { proxy, useSnapshot } from 'valtio'
import {SessionState} from "@/app/service/class/session-state";
import {StageType} from "@/app/service/class/stage-type";
import Api from "@/app/api/api";
import {simulateData} from "@/app/service/simulate-data";
import {LogType} from "@/app/service/class/log-enum";

export default class DataService {

  static data: {rounds: any[][]} = proxy({
    rounds: [],
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
    this.sourceData.push(item)

    let obj = JSON.parse(JSON.stringify(item))
    delete obj.sid
    delete obj.time
    delete obj.id
    delete obj.important_log
    this.filterData.push({
      id: item.id,
      time: item.time,
      important: item.important_log == 'important_log',
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
      if (type != undefined) {
        if (type === LogType.ActionStage) {
          if (content.indexOf('Turn') == 0) {
            this.data.rounds.push([])
          } else {
            if (content != this.lastActionStage) {
              this.lastRound().push([])
            }
          }
          this.lastActionStage = content
        } else if (type === LogType.DialogueContent) {
          if (content.trim().length == 0) content = 'No Data.'
          this.lastStage().push({
            type: LogType.DialogueContent,
            id: item['id'],
            time: item['time'],
            source: item['source_character'],
            target: item['target_character'],
            content: content,
          })
        } else if (type === LogType.ConclusionOfEnvironment) {
          if (content.trim().length == 0) content = 'No Data.'
          this.lastStage().push({
            type: LogType.ConclusionOfEnvironment,
            id: item['id'],
            time: item['time'],
            source: item['source_character'],
            content: content,
          })
        } else if (type === LogType.ReflectionResult) {
          if (content.trim().length == 0) content = 'No Data.'
          this.lastStage().push({
            type: LogType.ReflectionResult,
            id: item['id'],
            time: item['time'],
            source: item['source_character'],
            content: content,
          })
          this.moveRelationUpdateBack()
        } else if (type === LogType.BeliefUpdate) {
          let stage = this.lastStage()
          let ele = undefined
          let i = stage.length - 1
          for (; i >= 0; i--) {
            if (stage[i]['type'] === LogType.BeliefUpdate && stage[i]['source'] === item['source_character']) {
              ele = stage[i]
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
            const element = stage.splice(i, 1)[0]
            stage.push(element)
          }
        } else if (type === LogType.RelationUpdate) {
          let stage = this.lastStage()
          let ele = undefined
          let i = stage.length - 1
          for (; i >= 0; i--) {
            if (stage[i]['type'] === LogType.RelationUpdate) {
              ele = stage[i]
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
        }
      }
      this.usedIndex = i
    }
    console.log('Analysis finished', JSON.parse(JSON.stringify(this.data.rounds)))
  }

  static moveRelationUpdateBack() {
    let stage = this.lastStage()
    for (let i = 0; i < stage.length; i++) {
      if (stage[i].type === LogType.RelationUpdate) {
        const element = stage.splice(i, 1)[0]
        stage.push(element)
      }
    }
  }

  static lastRound() {
    return this.data.rounds[this.data.rounds.length - 1]
  }

  static lastStage() {
    let round = this.lastRound()
    return round[round.length - 1]
  }

}
