
export enum LogType {
  ActionStage = 'Action Stage',
  TurnChange = 'Turn Change',
  TurnEnd = 'Turn End',
  StageChange = 'Stage Change',

  ConclusionOfEnvironment = 'Conclusion Of Environment',
  SelectDialogueRole = 'Select Dialogue Role',
  DialogueContent = 'Dialogue Content',
  BeliefUpdate = 'Belief Update',
  RelationUpdate = 'Relation Update',
  SupportUpdate = 'Support Update',
  RelationStatus = 'Relation Status',
  EnvironmentJudgement = 'Environment Judgement',
  ReflectionResult = 'Reflection Result',
  OpenSpeechInRound = 'Open Speech In Round',
  
  HumanSpeaking = 'Human Speaking',
  HumanSpeakingResult = 'Human Speaking Result',

  GuessWhoWillWin = 'Guess Who Will Win',
  OpenSpeech = 'Open Speech',
  Voting = 'Voting',
  VotingExceptSelf = 'Voting Except Self',
  WinnerAnnouncement = 'Winner Announcement',
}

export function isSpeechType(type: LogType): boolean {
  return [
    LogType.ConclusionOfEnvironment,
    LogType.ReflectionResult,
    LogType.OpenSpeechInRound,
    LogType.OpenSpeech,
  ].indexOf(type) >= 0
}

export function isDialogType(type: LogType): boolean {
  return [
    LogType.DialogueContent,
    LogType.GuessWhoWillWin,
    LogType.Voting,
    LogType.VotingExceptSelf,
  ].indexOf(type) >= 0
}
