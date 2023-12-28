
export default class Stage {
  constructor(
    public messages: any[] = [],
    public type: StageType = StageType.UNKNOWN,
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
  OVERVIEW = 'OVERVIEW',
  START = 'START',
  CONFRONTATION = 'CONFRONTATION',
  COLLABORATION = 'COLLABORATION',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
  UPDATE = 'UPDATE',
  SETTLEMENT = 'SETTLEMENT',
  UNKNOWN = 'UNKNOWN',
}
