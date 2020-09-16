// import GameRoom, { gameRoomInstance } from './gameRoom'
// todo render the first game 
// todo when game is over update GameRoom.turn
// todo check to see the length of array and reset turn to zero if it will be longer than the array
// todo update the current game index in the controller
// todo play twentyone pilots tomorrow
import {cable} from './index'
import { gameRoomInstance } from "./gameRoom"

export let gameRoomGames = undefined

const gameTitleLi = () => document.querySelector('#col9 > div > ul > li.collection-header.blue-grey')
const gameCard = () => document.querySelector('#col9 > div > ul > li:nth-child(2) > div > div')

class Games {
  constructor(gameArray = []) {
    this.players = {}
    this.gameArray = gameArray
  }
  static play() {

  }

  static create() {
    gameRoomGames = new Games()
    gameRoomGames.gameArray.push(new triviaGames("test" ,{instructions: "These are instructions"}))
    gameRoomGames.gameArray.push(new PressTheLetterFirstGame)
    
  }

  renderGames() {
    let gameBeingPlayed = gameRoomGames.gameArray[gameRoomInstance
    .currentGame]
    gameBeingPlayed.render()
  } 
  
  render() {
    gameTitleLi().innerText = this.name
    gameCard().innerText = this.board.instructions
    this.constructor.establishActionCableConnection()
  }
}
class triviaGames extends Games{
  //board object takes attributes of instructions, and  and events
  constructor(name, boardObj) {
    super([])
    this.name = name
    this.board = boardObj
  }

  static establishActionCableConnection() {
    cable.subscriptions.create('TriviaChannel', {
      connected() {
        console.log("connected to the trivia room")
      },

      disconnected() {
      
      },
      
      received(data) {
        console.log(`This is the received data: ${data}`)
      },
    });
  }

  startTriviaGame() {
    triviaGames.establishActionCableConnection()

  }
  
  
}



  class PressTheLetterFirstGame extends Games{
    constructor(name, players) {
      super([])
      this.name = "test"
      this.players = players
      this.board = {
        instructions: "This is the test instructions"
      }
    }
  }
export {
  Games,
  triviaGames,
  PressTheLetterFirstGame,
} 