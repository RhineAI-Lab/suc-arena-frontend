import { proxy, useSnapshot } from 'valtio'
import {SessionState} from "@/app/service/session-state";

export default class DataService {

  static data = proxy({
    state: SessionState.INITIAL,
    round: -1,
    data: [
      [

      ]
    ],
  })

}
