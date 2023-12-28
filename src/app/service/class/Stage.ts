
export default class Stage {
  constructor(
    public messages: any[] = [],
    public type: StageType = StageType.UNKNOWN,
  ) {
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
