
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
