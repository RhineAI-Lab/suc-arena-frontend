
export enum LogType {
  ActionStage = 'Action stage',
  ConclusionOfEnvironment = 'Conclusion of environment',
  SelectDialogueRole = 'Select dialogue role',
  DialogueContent = 'Dialogue content',
  BeliefUpdate = 'Belief update',
  RelationUpdate = 'Relation update',
  SupportUpdate = 'Support update',
  RelationStatus = 'Relation status',
  EnvironmentJudgement = 'Environment judgement',
  ReflectionResult = 'Reflection result',
}

export enum ActionStageType {
  NewTurn = 'New turn',
  ConfrontationStage = 'Confrontation stage',
  CooperationStage = 'Cooperation stage',
  UpdateStage = 'Update stage',
}
