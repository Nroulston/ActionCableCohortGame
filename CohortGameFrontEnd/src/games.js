// import GameRoom, { gameRoomInstance } from './gameRoom'
// todo when game is over update GameRoom.turn
// todo check to see the length of array and reset turn to zero if it will be longer than the array
// todo update the current game index in the controller
// todo play twentyone pilots tomorrow
import {cable} from './index'
import { gameRoomInstance } from "./gameRoom"
import {HEADERS, player} from './player'

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
 
  static create() {
    gameRoomsGames = new Games()
    triviaGames.createAllTriviaGames()
    gameRoomsGames.gameArray.push(new PressTheLetterFirstGame)
  }

  
 
  renderGames() {
    gameBeingPlayed = gameRoomsGames.gameArray[gameRoomInstance
    .currentGame]
    gameBeingPlayed.renderGameGeneric()
    gameBeingPlayed.renderGameSpecifics()
    gameBeingPlayed.startGame()
    
    gameBeingPlayed.constructor.addEvents()
    
    // call the below to disconnect from a specific channel. Save the connection when made into a global variable. Use that as the passed in argument. 
 

    //cable.subscriptions.remove(global connection variable)

    //below disconnects from all channels
    // cable.disconnect()
  } 
  
  renderGameGeneric() {
    gameTitleLi().innerText = this.name
    gameCardtext().innerText = this.board.instructions
  }

  static nextGameCard() {
    //the below is testing when you get to the end of the array if you can hit it. If so you need to set turn, and currentgame to 0
    if (gameRoomInstance.currentGame == gameRoomsGames.gameArray.length ) {
      debugger
    }

    fetch(`http://127.0.0.1:3000/game_rooms/${gameRoomInstance.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({"t": "this"})
      })
  }
}

class triviaGames extends Games{
  //board object takes attributes of instructions, and  and events
  constructor(name, boardObj) {
    super([])
    this.name = name
    this.board = boardObj
  }
  
  static createAllTriviaGames() {
    triviaGames.createBasicTrivaGames()
    

  }
  static createBasicTrivaGames() {
    gameRoomsGames.gameArray.push(new triviaGames("trivia" ,{instructions: "These are instructions"}))
  } 
  static establishActionCableConnection() {
   triviaConnection = cable.subscriptions.create('TriviaChannel', {
      connected() {
        
      },

      disconnected() {
      
      },
      
      received(data) {
        console.log(`This is the received data: ${data}`)
      },
    });
    
  }
  
  
  
  static addEvents() {
    triviaSubmitBtn().addEventListener('click', super.nextGameCard)
  }

  startGame() {
    triviaGames.establishActionCableConnection()
    
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
// figure out how to send the the winning player over in the fetch PUT/Patch request. Try each one to see if that matters. The winning player is the person who clicks the right letter. 
class PressTheLetterFirstGame extends Games{
  constructor(name, board,) {
    super([])
    this.name = name
    this.players = players
    this.board = {
      instructions: "T"
    }
  }
}
export {
  Games,
  triviaGames,
  PressTheLetterFirstGame,
} 