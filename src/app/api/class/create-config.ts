
export default class CreateConfig {

  gameRound: number
  battleChatRound: number
  collaborationChatRound: number
  groupChatRound: number

  constructor(
    gameRound = 3,
    battleChatRound = 2,
    collaborationChatRound = 2,
    groupChatRound = 2,
  ) {
    this.gameRound = gameRound
    this.battleChatRound = battleChatRound
    this.collaborationChatRound = collaborationChatRound
    this.groupChatRound = groupChatRound
  }

  toRaw() {
    return JSON.stringify({
      game_round: this.gameRound,
      private_chat_round: this.battleChatRound,
      meeting_chat_round: this.collaborationChatRound,
      group_chat_round: this.groupChatRound,
    })
  }

}
