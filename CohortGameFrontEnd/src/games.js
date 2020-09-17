// import GameRoom, { gameRoomInstance } from './gameRoom'
// todo when game is over update GameRoom.turn
// todo check to see the length of array and reset turn to zero if it will be longer than the array
// todo update the current game index in the controller
// todo play twentyone pilots tomorrow
import {cable, allPlayer} from './index'
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
    const strongParamsGameRoom = {
      game_room: {
        turn: gameRoomInstance.turn,
        currentGame: gameRoomInstance.currentGame,
      }
    }
    if (gameRoomInstance.currentGame == gameRoomsGames.gameArray.length ) {
      gameRoomInstance.currentGame = 0
    } else {
      gameRoomInstance.currentGame += 1
    }
    if(allPlayer.value().length == (gameRoomInstance.turn + 1)) {
      gameRoomInstance.turn = 0
    } else {
      gameRoomInstance.incrementTurn()
    }

    fetch(`http://127.0.0.1:3000/game_rooms/${gameRoomInstance.id}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify(gameRoomInstance)
      })
  }
}

class triviaGames extends Games{
  //board object takes attributes of instructions, and  and events
  constructor(name, boardObj) {
    super([])
    this.name = name
    this.board = boardObj
    this.roundsGameLasts
  }
  
  static createAllTriviaGames() {
    triviaGames.createBasicTriviaGames("Drinks all around" ,{instructions: "Everyone raise their drinks and say cheers"})
    triviaGames.createBasicTriviaGames("Group Pick", {instructions: "Everyone type a player in the chat \n \n The player called out the most drinks"})
    triviaGames.createRoundTriviaGame("")
    triviaGames.createBasicTriviaGames("Hariest", {instructions: "Hariest player drinks"})
    triviaGames.createBasicTriviaGames("Hobbies", {instructions: "Tell Everyone your favourite hobby then drink"})
    triviaGames.createBasicTriviaGames("Text tell or drink", {instructions: "Every player must read their last text out loud or drink"})
    triviaGames.createRoundTriviaGame("Ban a word", {instructions: "You can pick a word that is banned for two rounds if anyone says this word they must drink"}, 2)
    triviaGames.createBasicTriviaGames("Can You Read It", {instructions: "if yuo cna raed tihs tehn dinrk"})
    triviaGames.createRoundTriviaGame("No Phones", {instructions: "For one round if anyone checks their phone they must drink"}, 1)
    triviaGames.createBasicTriviaGames("Phone Love", {instructions: "Call someone and tell them you love them"})
    triviaGames.createBasicTriviaGames("Dance!!!", {instructions: 'Do a dance or Take a drink'})
    triviaGames.createRoundTriviaGame("Close your eyes", {instructions: 'Play this round with your eyes closed'}, 1)
    triviaGames.createBasicTriviaGames("Who is sober", {instructions: 'Everyond vote who the most sober player is in the chat, They must drink half their drink'})
    triviaGames.createBasicTriviaGames('Single?', {instructions: 'Drink if you have been singe for 6 months or more'})
    triviaGames.createBasicTriviaGames("Vegan?", {instructions: 'Vegans drink'})
    triviaGames.createBasicTriviaGames('CoinToss', {instructions: 'Choose heads or tails and flip a coin, if correct then everyone except you drinks, if incorrect then you drink '})
    triviaGames.createBasicTriviaGames("Gesture train", {instructions: 'Make a gesture. The next player must must repeat the gesture and make another one. Keep going repeating the Gesture train and making a new one until someone forgets. The player who forgets must drink'})
    triviaGames.createBasicTriviaGames("Can you tell?", {instructions: 'Tell EVeryone two truths and one lie. Every player must guess which one is a lie. If you get it wrong drink.'})





    

  }
  static createBasicTriviaGames(nameStr, instructionsObj) {
    gameRoomsGames.gameArray.push(new triviaGames(nameStr, instructionsObj))

  } 

  static createRoundTriviaGame(nameStr, instructionsObj, roundsGameLasts) {
    gameRoomsGames.gameArray.push(new triviaGames(nameStr, instructionsObj, roundsGameLasts))
  }

  static establishActionCableConnection() {
   triviaConnection = cable.subscriptions.create('TriviaChannel', {
      connected() {
        
      },

      disconnected() {
      
      },
      
      received(data) {
        gameRoomInstance.setInfoFromBroadcast(data)
        console.log(`This is the received data: ${data}`)
        debugger
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
    // write an if statement that renders a small game card that keeps track of the turns it has left and it's rules.
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
  constructor(name, board,) {
    super([])
    this.name = name
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