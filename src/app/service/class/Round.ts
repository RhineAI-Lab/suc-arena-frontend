import Stage, {StageType} from "@/app/service/class/Stage";

export default class Round {

  public finished: boolean = false
  constructor(
    public stages: Stage[] = [],
    public type: RoundType = RoundType.UNKNOWN,
    public name: string = 'Unknown',
    public max: number = 4,
  ) {
  }

  static OverviewRound(): Round {
    return new Round([new Stage([], StageType.OVERVIEW)], RoundType.OVERVIEW, 'Overview', 1)
  }

  static StartRound(): Round {
    return new Round([new Stage([], StageType.START)], RoundType.START, 'Start', 1)
  }

  static NormalRound(name: string): Round {
    return new Round([], RoundType.ROUND, name, 4)
  }

  static SettlementRound(): Round {
    return new Round([new Stage([], StageType.SETTLEMENT)], RoundType.SETTLEMENT, 'Settlement', 4)
  }

  getPageName(index: number): string {
    if (index < this.stages.length) {
      let name = this.stages[index].name
      if (name.length > 0) {
        return this.name + ' - ' + name
      }
    }
    return this.name
  }
}

export enum RoundType {
  OVERVIEW = 'OVERVIEW',
  START = 'START',
  ROUND = 'ROUND',
  SETTLEMENT = 'SETTLEMENT',
  UNKNOWN = 'UNKNOWN',
}
