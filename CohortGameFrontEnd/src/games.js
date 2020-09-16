// import GameRoom, { gameRoomInstance } from './gameRoom'
// todo when game is over update GameRoom.turn
// todo check to see the length of array and reset turn to zero if it will be longer than the array
// todo update the current game index in the controller
// todo play twentyone pilots tomorrow
import {cable} from './index'
import { gameRoomInstance } from "./gameRoom"

export let gameRoomsGames = undefined
// getters
const gameTitleLi = () => document.querySelector('#col9 > div > ul > li.collection-header.blue-grey')
const gameCard = () => document.querySelector('#col9 > div > ul > li:nth-child(2) > div')
const gameCardtext = () => document.querySelector('#col9 > div > ul > li:nth-child(2) > div > div')
const triviaSubmitBtn = () => document.querySelector("#submitTrivia")

// hoisted game variables
let triviaConnection = undefined
let gameBeingPlayed = undefined

class Games {
  constructor(gameArray = []) {
    this.players = {}
    this.gameArray = gameArray
  }
  static play() {

  }

  static create() {
    gameRoomsGames = new Games()
    gameRoomsGames.gameArray.push(new triviaGames("trivia" ,{instructions: "These are instructions"}))
    gameRoomsGames.gameArray.push(new PressTheLetterFirstGame)
  }

 
  renderGames() {
    gameBeingPlayed = gameRoomsGames.gameArray[gameRoomInstance
    .currentGame]
    gameBeingPlayed.renderGameGeneric()
    gameBeingPlayed.renderGameSpecifics()
    gameBeingPlayed.startTriviaGame()
    
    // call the below to disconnect from a specific channel. Save the connection when made into a global variable. Use that as the passed in argument. 
 

    //cable.subscriptions.remove(global connection variable)

    //below disconnects from all channels
    // cable.disconnect()
  } 
  
  renderGameGeneric() {
    gameTitleLi().innerText = this.name
    gameCardtext().innerText = this.board.instructions
   
    
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
   triviaConnection = cable.subscriptions.create('TriviaChannel', {
      connected() {
        console.log("connected to the trivia room")
      },

      disconnected() {
        console.log('disconnected')
      },
      
      received(data) {
        console.log(`This is the received data: ${data}`)
      },
    });
    
  }
  // todo when game is over update GameRoom.turn
// todo check to see the length of array and reset turn to zero if it will be longer than the array
// todo update the current game index in the controller
// todo play twentyone pilots tomorrow
  static nextGameCard() {
    const objectToSend = { 
      
    }
    debugger
  }

  startTriviaGame() {
    triviaGames.establishActionCableConnection()
    triviaGames.nextGameCard()
  }
  renderGameSpecifics() {
    const row = document.createElement('div')
    const btn = document.createElement('a')
    const div = document.createElement('div')
    row.className = "center-align"
    btn.className = "waves-effect waves-light btn-large"
    btn.setAttribute('id', "submitTrivia")
    btn.innerText = "Next Card" 
    row.className = "row"
    div.className = 'center-align col s12'
    gameCard().append(row)
    row.append(div)
    div.append(btn)
    
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