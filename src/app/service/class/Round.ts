import Stage, {StageType} from "@/app/service/class/Stage";

export default class Round {

  public finished: boolean = false
  constructor(
    public stages: Stage[] = [],
    public type: RoundType = RoundType.Unknown,
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
    return this.type === RoundType.Normal || this.type === RoundType.Settlement
  }

  static OverviewRound(): Round {
    return new Round([new Stage([], StageType.Overview)], RoundType.Overview, 'Overview')
  }

  static StartRound(): Round {
    return new Round([new Stage([], StageType.Start)], RoundType.Start, 'Start')
  }

  static NormalRound(name: string): Round {
    return new Round(
      [],
      RoundType.Normal,
      name,
      ['对抗阶段', '合作阶段', '宣言阶段', '更新阶段']
    )
  }

  static SettlementRound(): Round {
    return new Round(
      [],
      RoundType.Settlement,
      'Settlement',
      ['预测阶段', '宣言阶段', '投票阶段', '对外投票阶段']
    )
  }
}

export enum RoundType {
  Introduce = 'Introduce Round',
  Background = 'Background Round',
  Start = 'Start Round',
  Overview = 'Overview Round',

  Normal = 'Normal Round',
  Settlement = 'Settlement Round',

  Unknown = 'Unknown Round',
}
