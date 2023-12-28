import Stage, {StageType} from "@/app/service/class/Stage";

export default class Round {

  public finished: boolean = false
  constructor(
    public stages: Stage[] = [],
    public type: RoundType = RoundType.UNKNOWN,
    public name: string = 'Unknown',
    public stageNames: string[] = [''],
  ) {
  }

  getPageName(index: number): string {
    if (index < this.stageNames.length) {
      let name = this.stageNames[index]
      if (name.length > 0) {
        return this.name + ' - ' + name
      }
    }
    return this.name
  }

  maxStageNumber() {
    return this.stageNames.length
  }

  isRoundOrSettlement(): boolean {
    return this.type === RoundType.ROUND || this.type === RoundType.SETTLEMENT
  }

  static OverviewRound(): Round {
    return new Round([new Stage([], StageType.OVERVIEW)], RoundType.OVERVIEW, 'Overview')
  }

  static StartRound(): Round {
    return new Round([new Stage([], StageType.START)], RoundType.START, 'Start')
  }

  static NormalRound(name: string): Round {
    return new Round(
      [],
      RoundType.ROUND,
      name,
      ['对抗阶段', '合作阶段', '宣言阶段', '更新阶段']
    )
  }

  static SettlementRound(): Round {
    return new Round(
      [],
      RoundType.SETTLEMENT,
      'Settlement',
      ['预测阶段', '宣言阶段', '投票阶段', '对外投票阶段']
    )
  }
}

export enum RoundType {
  OVERVIEW = 'OVERVIEW',
  START = 'START',
  ROUND = 'ROUND',
  SETTLEMENT = 'SETTLEMENT',
  UNKNOWN = 'UNKNOWN',
}
