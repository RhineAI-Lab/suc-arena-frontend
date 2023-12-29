
export default class Stage {
  constructor(
    public messages: any[] = [],
    public type: StageType = StageType.Unknown,
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
    type = type.trim().split(' ').map((item: string) => {
      return item[0].toUpperCase() + item.substring(1)
    }).join(' ')
    let stage = type == StageType.Introduce ? new Stage([], StageType.Introduce)
      : type == StageType.Background ? new Stage([], StageType.Background)
      : type == StageType.Start ? new Stage([], StageType.Start)
      : type == StageType.Overview ? new Stage([], StageType.Overview)
      : type == StageType.Confrontation ? new Stage([], StageType.Confrontation)
      : type == StageType.Cooperation ? new Stage([], StageType.Cooperation)
      : type == StageType.Announcement ? new Stage([], StageType.Announcement)
      : type == StageType.Update ? new Stage([], StageType.Update)
      : type == StageType.Guess ? new Stage([], StageType.Guess)
      : type == StageType.OpenSpeech ? new Stage([], StageType.OpenSpeech)
      : type == StageType.Vote ? new Stage([], StageType.Vote)
      : type == StageType.VoteOthers ? new Stage([], StageType.VoteOthers)
      : undefined
    if (stage) return stage
    console.warn('Unknown stage type: ' + type)
    return new Stage([], StageType.Unknown)
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
