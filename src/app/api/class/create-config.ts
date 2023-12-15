
export default class CreateConfig {

  gameRound: number
  battleChatRound: number
  collaborationChatRound: number

  constructor(
    gameRound = 3,
    battleChatRound = 2,
    collaborationChatRound = 2,
  ) {
    this.gameRound = gameRound
    this.battleChatRound = battleChatRound
    this.collaborationChatRound = collaborationChatRound
  }

  toRaw() {
    return JSON.stringify({
      game_round: this.gameRound,
      battle_chat_round: this.battleChatRound,
      collaboration_chat_round: this.collaborationChatRound,
    })
  }

}
