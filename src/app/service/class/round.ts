import Stage, {StageType} from "@/app/service/class/stage";
import StageConfig from "@/app/service/class/stage-config";

export default class Round {

  public finished: boolean = false
  constructor(
    public stages: Stage[] = [],
    public type: RoundType = RoundType.Unknown,
    public name: string = 'Unknown',
    public stageConfigs: StageConfig[] = [],
  ) {
  }

  getPageName(index: number): string {
    if (index < this.stageConfigs.length) {
      let name = this.stageConfigs[index].name
      if (name.length > 0) {
        return this.name + ' - ' + name
      }
    }
    return this.name
  }

  maxStageNumber() {
    return this.stageConfigs.length
  }

  isRoundOrSettlement(): boolean {
    return this.type === RoundType.Normal || this.type === RoundType.Settlement
  }

  static StartRound(): Round {
    return new Round(
      [new Stage([], StageType.Start)],
      RoundType.Start,
      'Start',
      [StageConfig.Start()]
    )
  }

  static OverviewRound(): Round {
    return new Round(
      [new Stage([], StageType.Overview)],
      RoundType.Overview,
      'Overview',
      [StageConfig.Overview()]
    )
  }

  static NormalRound(name: string): Round {
    return new Round(
      [],
      RoundType.Normal,
      name,
      [
        StageConfig.Confrontation(),
        StageConfig.Cooperation(),
        StageConfig.Announcement(),
        StageConfig.Update(),
      ]
    )
  }

  static SettlementRound(name: string): Round {
    return new Round(
      [],
      RoundType.Settlement,
      name,
      [
        StageConfig.Guess(),
        StageConfig.Announcement(),
        StageConfig.Vote(),
        StageConfig.VoteOthers(),
      ]
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
