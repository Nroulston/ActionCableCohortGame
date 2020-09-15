import Player from './player'
import {allPlayer, inputForm, column9div, userLogInDiv, cable, body, game} from './index'
export let gameRoomInstance = undefined
class GameRoom {
  constructor(name,  id, turn=0) {
    this.name = name;
    this.turn = turn
    this.id = id
    this.player = undefined

  }
  static startGame(json) {
    gameRoomInstance = new GameRoom(json.game_room.name, json.game_room_id )
    gameRoomInstance.whoseTurnIsIt()
    
  }
  static enterGame() { 
    inputForm().addEventListener('keydown', function(e) {
      if (e.keyCode == 13) {
         e.preventDefault()
         GameRoom.stopDisplayingLogin()
         GameRoom.establishActionCableConnection()
         GameRoom.createLayout()
         Player.getPlayers()
         GameRoom.displayGameBoard()
      
         //attempted to assign game.player and it came out undefined. It makes no sense as to why everything comes out undefined.
         // turns out that async functions allow so much code to pass that allPlayer isn't assigned at the time of console.logging the next steps.
         
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
  
    div.className = 'row'
    ul.className = 'collection with-header'
    titleLi.className = 'collection-header blue-grey'
    gameLI.className = 'collection-item'
    gameCardDiv.className = 'card blue-grey'
    cardDivContent.className = 'card-content white-text'
    
    column9div().append(div)
    div.append(ul)
    ul.append(titleLi)
    ul.append(gameLI)
    gameLI.append(gameCardDiv)
    gameCardDiv.append(cardDivContent)

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
        // fetch(`http://127.0.0.1:3000/players/${allPlayer.currentPlayer()}`)
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
  whoseTurnIsIt() {
    // both methods somehow cause a bug in console. If you copy the entire code over everything works fine.
    // the errors are potentially due to the speed of async functions and the rest.
    let players = allPlayer.value()
  
    Player.nameBoxCreator(this.players[0])
    
    console.log('test')
    console.log(this.players)
    
     console.log(allPlayer.currentPlayer(this.turn))
   return allPlayer.currentPlayer(this.turn)
  }
}

export default GameRoom