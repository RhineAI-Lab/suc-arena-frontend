import Stage, {StageType} from "@/app/service/class/Stage";

export default class Round {
  constructor(
    public stages: Stage[] = [],
    public type: RoundType = RoundType.UNKNOWN,
    public max: number = 4
  ) {
  }

  static OverviewRound(): Round {
    return new Round([new Stage([], StageType.OVERVIEW)], RoundType.OVERVIEW)
  }

  static StartRound(): Round {
    return new Round([new Stage([], StageType.START)], RoundType.START)
  }
}

export enum RoundType {
  OVERVIEW = 'OVERVIEW',
  START = 'START',
  ROUND = 'ROUND',
  SETTLEMENT = 'SETTLEMENT',
  UNKNOWN = 'UNKNOWN',
}
