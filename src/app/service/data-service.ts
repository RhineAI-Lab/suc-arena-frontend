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

  static sourceData: any[] = [

  ]

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
  }

  static simulate() {
    Api.data.sid = 'da2569d0ca9d4b2aa2c24a8a82494041'
    let i = 0
    let interval = setInterval(() => {
      let num = Math.floor(Math.random() * 5) + 1
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
    }, 200)
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
          this.lastStage().push({
            type: LogType.DialogueContent,
            id: item['id'],
            time: item['time'],
            source: item['source_character'],
            target: item['target_character'],
            content: content,
          })
        } else if (type === LogType.ConclusionOfEnvironment) {
          this.lastStage().push({
            type: LogType.ConclusionOfEnvironment,
            id: item['id'],
            time: item['time'],
            source: item['source_character'],
            content: content,
          })
        } else if (type === LogType.ReflectionResult) {
          this.lastStage().push({
            type: LogType.ReflectionResult,
            id: item['id'],
            time: item['time'],
            source: item['source_character'],
            content: content,
          })
        } else if (type === LogType.BeliefUpdate) {
          this.lastStage().push({
            type: LogType.BeliefUpdate,
            id: item['id'],
            time: item['time'],
            source: item['source_character'],
            target: item['target_character'],
            content: content,
          })
        } else if (type === LogType.RelationUpdate) {
          this.lastStage().push({
            type: LogType.RelationUpdate,
            id: item['id'],
            time: item['time'],
            source: item['source_character'],
            target: item['target_character'],
            content: content,
          })
        }
      }
      this.usedIndex = i
    }
    console.log('Analysis finished', JSON.parse(JSON.stringify(this.data.rounds)))
  }

  static lastRound() {
    return this.data.rounds[this.data.rounds.length - 1]
  }

  static lastStage() {
    let round = this.lastRound()
    return round[round.length - 1]
  }

}
