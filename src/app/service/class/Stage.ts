
export default class Stage {
  constructor(
    public messages: any[] = [],
    public type: StageType = StageType.Unknown,
    public coverId: number = 0,
  ) {
  }

  push(message: any) {
    this.messages.push(message)
  }

  size(): number {
    return this.messages.length
  }

  get(index: number): any {
    return this.messages[index]
  }

  static create(type: string): Stage {
    let stage = type == StageType.Introduce ? new Stage([], StageType.Introduce, 1)
      : type == StageType.Background ? new Stage([], StageType.Background, 2)
      : type == StageType.Start ? new Stage([], StageType.Start, 3)
      : type == StageType.Overview ? new Stage([], StageType.Overview, 4)
      : type == StageType.Confrontation ? new Stage([], StageType.Confrontation, 5)
      : type == StageType.Cooperation ? new Stage([], StageType.Cooperation, 6)
      : type == StageType.Announcement ? new Stage([], StageType.Announcement, 7)
      : type == StageType.Update ? new Stage([], StageType.Update, 8)
      : type == StageType.Guess ? new Stage([], StageType.Guess, 9)
      : type == StageType.OpenSpeech ? new Stage([], StageType.OpenSpeech, 10)
      : type == StageType.Vote ? new Stage([], StageType.Vote, 11)
      : type == StageType.VoteOthers ? new Stage([], StageType.VoteOthers, 12)
      : undefined
    if (stage) return stage
    console.warn('Unknown stage type: ' + type)
    return new Stage([], StageType.Unknown, 0)
  }
}

export enum StageType {
  Introduce = 'Introduce Stage',
  Background = 'Background Stage',
  Start = 'Start Stage',
  Overview = 'Overview Stage',

  Confrontation = 'Confrontation Stage',
  Cooperation = 'Cooperation Stage',
  Announcement = 'Announcement Stage',
  Update = 'Update Stage',

  Guess = 'Guess Stage',
  OpenSpeech = 'Open Speech Stage',
  Vote = 'Vote Stage',
  VoteOthers = 'Vote Others Stage',

  Unknown = 'Unknown Stage',
}
