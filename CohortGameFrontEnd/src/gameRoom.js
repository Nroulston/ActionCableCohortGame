import Player from './player'
import {Games,gameRoomsGames} from './games';
import {allPlayer, inputForm, column9div, userLogInDiv, cable, body, game} from './index'

export let gameRoomInstance = undefined

class GameRoom {
  constructor(name,  id, turn=0, currentGame) {
    this.name = name;
    this.turn = turn
    this.id = id
    this.currentGame = currentGame
    this.currentTurnPlayer = undefined
    // potentially change currentGame to currentGame index to make more sense when reading the code. 

  }
  static startGames(json) {
    gameRoomInstance = new GameRoom(json.game_room.name, json.game_room_id, json.game_room.turn, json.game_room.currentGame )
    
    GameRoom.displayGameBoard()
    gameRoomInstance.setWhoseTurnItIs()
    Games.create()
    // todo pass in the currentGame, call the gameroom instance
    gameRoomsGames.renderGames()
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
    // const instrucitonsDiv = document.createElement()
    const cardDivContent = document.createElement('div')
    const currentPlayerLi = document.createElement('li')
  
    div.className = 'row'
    ul.className = 'collection with-header'
    titleLi.className = 'collection-header blue-grey center-align'
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
       
      },
  
      disconnected() {
       
      },
      
  
      received(data) {
      
        Player.create(data.id, data.name, data.turnCounter, data.gameForTurnCounter)
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

  setInfoFromBroadcast(data) {
    this.turn = data.turn
    this.currentGame = data.currentGame
  }
}

export default GameRoom