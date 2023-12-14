import { proxy, useSnapshot } from 'valtio'
import {SessionState} from "@/app/service/class/session-state";
import {StageType} from "@/app/service/class/stage-type";

export default class DataService {

  static data = proxy({
    state: SessionState.INITIAL,
    rounds: [
      [
        {
          type: StageType.CONFRONTATION,
          stageName: '对抗阶段',

          source: 'C0000',
          target: 'C0005',
        }
      ]
    ],
  })

  static getRoundsNumber() {
    return DataService.data.rounds.length
  }

  static getStagesNumber(roundId: number) {
    return DataService.data.rounds[roundId].length
  }

}
