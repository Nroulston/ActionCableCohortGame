// Todo figure out why when first accessing the site starts the actioncable process, on reload it doesn't.

// Todo figure out how to write async functions inside the class and make it a class method.

 import ActionCable from 'actioncable'
 import Player from './player'
 import GameRoom from './gameRoom'

class testGame extends GameRoom {

}
class PressTheLetterFirstGame extends GameRoom {
  constructor(name, players) {
    this.name = name
    super(players)
  }
}

const API_WS_ROOT = 'ws://localhost:3000/cable';

 
export const cable = ActionCable.createConsumer(API_WS_ROOT)
// //getters
export const body = () => document.querySelector(".container")
export const userLogInDiv = () => document.querySelector('#showLogIn')
export const inputForm = () => document.querySelector("#user_name")
export const column9div = () => document.querySelector('#col9')
export const column3div = () => document.querySelector('#col3')


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
  GameRoom.enterGame()
  
})



// function establishActionCableConnection() {
//   cable.subscriptions.create('GameRoomChannel', {
//     connected() {
//       console.log("connected to the room")
//     },

//     disconnected() {
//       // fetch(`http://127.0.0.1:3000/players/${allPlayer.currentPlayer()}`)
//     },

//     received(data) {
//       // console.log(`This is the received data: ${data}`)
//       Player.nameBoxCreator(data)
//     },
    
//   });
// }





