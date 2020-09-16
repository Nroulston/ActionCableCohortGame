import GameRoom, { gameRoomInstance } from './gameRoom'

export let gameRoomGames = undefined

class Games {
  constructor(gameArray = []) {
    this.players = {}
    this.gameArray = gameArray
  }
  static play() {

  }

  static create() {
    gameRoomGames = new Games()
    gameRoomGames.gameArray.push(new testGame())
    gameRoomGames.gameArray.push(new PressTheLetterFirstGame)

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