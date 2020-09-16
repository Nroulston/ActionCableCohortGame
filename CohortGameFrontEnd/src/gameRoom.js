import Player from './player'
import {Games, testGame, PressTheLetterFirstGame} from './games';
import {allPlayer, inputForm, column9div, userLogInDiv, cable, body, game} from './index'

export let gameRoomInstance = undefined

class GameRoom {
  constructor(name,  id, turn=0) {
    this.name = name;
    this.turn = turn
    this.id = id

    this.currentTurnPlayer = undefined

  }
  static startGames(json) {
    gameRoomInstance = new GameRoom(json.game_room.name, json.game_room_id, json.game_room.turn )
    GameRoom.displayGameBoard()
    gameRoomInstance.setWhoseTurnItIs()
    let gamesController = new Games 
    let test = new testGame
    let test2 = new PressTheLetterFirstGame
    debugger
    // when you submit a game make sure to update the database instance's turn so that new people joining will be on the latest turn
    // when submitting make sure to update back to index zero if you are at the length of the current player array.
  }

  static enterGame() { 
    inputForm().addEventListener('keydown', function(e) {
      if (e.keyCode == 13) {
         e.preventDefault()
         GameRoom.stopDisplayingLogin()
         GameRoom.establishActionCableConnection()
         GameRoom.createLayout()
         Player.getPlayers()
         
      } 
    })
   }

   static createLayout() {
    const rowDiv = document.createElement('div')
    const col3Div = document.createElement('div')
    const col9Div = document.createElement('div')
    rowDiv.className = "row"
    col3Div.className = "col s3"
    col3Div.setAttribute('id', 'col3')
    col9Div.className = "col s9"
    col9Div.setAttribute('id', 'col9')
    body().append(rowDiv)
    rowDiv.append(col3Div)
    rowDiv.append(col9Div)
  }
  
  static displayGameBoard() {
    const div = document.createElement('div')
    const ul = document.createElement('ul' )
    const titleLi = document.createElement('li')
    const gameLI  = document.createElement('li')
    const gameCardDiv = document.createElement('div')
    const cardDivContent = document.createElement('div')
    const currentPlayerLi = document.createElement('li')
  
    div.className = 'row'
    ul.className = 'collection with-header'
    titleLi.className = 'collection-header blue-grey'
    gameLI.className = 'collection-item'
    currentPlayerLi.className = 'collection-item'
    gameCardDiv.className = 'card blue-grey'
    cardDivContent.className = 'card-content white-text'
    
    
    column9div().append(div)
    div.append(ul)
    ul.append(titleLi)
    ul.append(gameLI)
    gameLI.append(gameCardDiv)
    gameCardDiv.append(cardDivContent)
    ul.append(currentPlayerLi)

  }

  static stopDisplayingLogin() {
    userLogInDiv().style.display = "none"
    }

  static establishActionCableConnection() {
    cable.subscriptions.create('GameRoomChannel', {
      connected() {
        console.log("connected to the room")
      },
  
      disconnected() {
       
      },
      
  
      received(data) {
        // console.log(`This is the received data: ${data}`)
        Player.nameBoxCreator(data)
      },
      
    });
  }
    
  
  incrementTurn() {
    this.turn += 1
    return this.turn
  }

  setWhoseTurnItIs() {
    this.currentTurnPlayer = allPlayer.currentPlayer(this.turn)
    Player.renderCurrentPlayer()
  }
}

export default GameRoom