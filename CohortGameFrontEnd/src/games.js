import GameRoom, { gameRoomInstance } from './gameRoom'


class Games {
  constructor(gameArray = []) {
    this.players = {}
    this.gameArray = gameArray
  }
}

  class testGame extends Games{
    constructor(name, players) {
      super([])
      this.name = name
      this.players = players
    }
  }

  class PressTheLetterFirstGame extends Games{
    constructor(name, players) {
      super([])
      this.name = name
      this.players = players
    }
  }
export {
  Games,
  testGame,
  PressTheLetterFirstGame,
} 