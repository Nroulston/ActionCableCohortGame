 import ActionCable from 'actioncable'
 import Player from './player'

// class Player {
//   constructor(id, name) {
//     this.id = id;
//     this.name = name;
//   }

//   static create(id, name) {
   
//     let player = new Player(id, name)
//     allPlayer.addPlayer(player);
//     return player
//   }
  
//   static getPlayers() {
//     fetch('http://127.0.0.1:3000/players.json')
//     .then(response => response.json())
//     .then(json => { 
//       // console.log(`this is the fetch ${json} data`)
//       json.forEach( player => {
//         nameBoxCreator(player)
//       Player.create(player.id, player.name)
//       })
//        sendNameFetch()
//     })
//     .catch((error) => {
//       console.error('error:', error)
//     })
//   }
// }
function nameBoxCreator(data) {
    const nameBoxDiv = document.createElement('div')
    const div1InsideOfBoxDiv = document.createElement('div')
    const div2InsideOfBoxDiv = document.createElement('div')
    const nameBoxSpan = document.createElement('span')
    nameBoxDiv.className = "row"
    div2InsideOfBoxDiv.className = 'card-panel teal'
    nameBoxSpan.className = 'white-text'
    nameBoxSpan.innerText = data.name
    column3div().append(nameBoxDiv)
    nameBoxDiv.append(div1InsideOfBoxDiv)
    div1InsideOfBoxDiv.append(div2InsideOfBoxDiv)
    div2InsideOfBoxDiv.append(nameBoxSpan)
}
class GameRoom {
  constructor(name, players, turn=0) {
    this.name = name;
    this.players = players;
    this.turn = turn
    this.player = undefined
  }
  
  incrementTurn() {
    this.turn += 1
    return this.turn
  }
  whoseTurnIsIt() {
//     // both methods somehow cause a bug in console. If you copy the entire code over everything works fine.

    nameBoxCreator(this.players[0])
    console.log('test')
    console.log(this.players)
  
     console.log(allPlayer.currentPlayer(this.turn))
   return allPlayer.currentPlayer(this.turn)
  }
}

class testGame extends GameRoom {

}
class PressTheLetterFirstGame extends GameRoom {
  constructor(name, players) {
    this.name = name
    super(players)
  }
}

const API_WS_ROOT = 'ws://localhost:3000/cable';
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept' : 'application/json',
};
 
const cable = ActionCable.createConsumer(API_WS_ROOT)
// //getters
const body = () => document.querySelector(".container")
const userLogInDiv = () => document.querySelector('#showLogIn')
export const inputForm = () => document.querySelector("#user_name")
const column9div = () => document.querySelector('#col9')
export const column3div = () => document.querySelector('#col3')

const stopDisplayingLogin = () => {
userLogInDiv().style.display = "none"
}
// // the power of IIFE and closure all in one.
// // Gives us a constant that has persistent memory of the player array
export const allPlayer = (function() {
  const playersArray = []
  function addPlayerToAll(player) {
    playersArray.push(player)
  }

  return {
    addPlayer: function(player) {
      addPlayerToAll(player)
    },

    value: function() {
      return playersArray
    },

    currentPlayer: function(index) {
      let players = allPlayer.value()

      const player = players[index]
      
      return player
    }
  }
})();

const enterGame = () => { 
 inputForm().addEventListener('keydown', function(e) {
   if (e.keyCode == 13) {
      e.preventDefault()
      stopDisplayingLogin()
      establishActionCableConnection()
      createLayout()
      Player.getPlayers()
      displayGameBoard()
      const game = new GameRoom("Default", allPlayer.value())
      // game.whoseTurnIsIt()
      //attempted to assign game.player and it came out undefined. It makes no sense as to why everything comes out undefined.
     
   } 
 })
}

function createLayout() {
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

const displayGameBoard = () => {
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

document.addEventListener("DOMContentLoaded", function() {
  const div = document.createElement("div")
  const formDiv = document.createElement('div')
  const form = document.createElement("FORM")
  const inputDiv = document.createElement("div")
  const inputField = document.createElement('input')
  const inputLabel = document.createElement('label')
  div.className = 'row'
  div.setAttribute('id', 'showLogIn')
  form.className = 'col s6'
  formDiv.className = 'row'
  inputDiv.className = 'input-field col s6'
  inputField.placeholder = "Enter Name"
  inputField.setAttribute("id", "user_name")
  inputField.setAttribute("name", "user[name]")
  inputField.setAttribute('type', 'text')
  inputLabel.setAttribute("for", "user_name")
  inputLabel.className = "active"
  inputLabel.innerText = "First Name"
  body().append(div)
  div.append(form)
  form.append(formDiv)
  formDiv.append(inputDiv)
  inputDiv.append(inputField)
  inputDiv.append(inputLabel)
  enterGame()
})


function establishActionCableConnection() {
  cable.subscriptions.create('GameRoomChannel', {
    connected() {
      console.log("connected to the room")
    },

    disconnected() {
      // fetch(`http://127.0.0.1:3000/players/${allPlayer.currentPlayer()}`)
    },

    received(data) {
      // console.log(`This is the received data: ${data}`)
      nameBoxCreator(data)
    },
    
  });
}





