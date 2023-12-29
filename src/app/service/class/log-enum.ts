
export enum LogType {
  ActionStage = 'Action stage',
  TurnChange = 'Turn Change',
  TurnEnd = 'Turn End',
  StageChange = 'Stage Change',

  ConclusionOfEnvironment = 'Conclusion of environment',
  SelectDialogueRole = 'Select dialogue role',
  DialogueContent = 'Dialogue content',
  BeliefUpdate = 'Belief update',
  RelationUpdate = 'Relation update',
  SupportUpdate = 'Support update',
  RelationStatus = 'Relation status',
  EnvironmentJudgement = 'Environment judgement',
  ReflectionResult = 'Reflection result',
  OpenSpeechInRound = 'Open Speech In Round',

  OpenSpeech = 'Open Speech',
  Voting = 'Voting',
  VotingExceptSelf = 'Voting Except Self',
  WinnerAnnouncement = 'Winner Announcement',
}
