
import ActionCable from 'actioncable'
const API_WS_ROOT = 'ws://localhost:3000/cable';
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept' : 'application/json',
};

//getters
const cable = ActionCable.createConsumer(API_WS_ROOT)
const body = () => document.querySelector(".container")
const userLogInDiv = () => document.querySelector('#showLogIn')
const inputForm = () => document.querySelector("#user_name")
const column9div = () => document.querySelector('#col9')
const column3div = () => document.querySelector('#col3')

const enterGame = () => { 
 inputForm().addEventListener('keydown', function(e) {
   if (e.keyCode == 13) {
     e.preventDefault()
     stopDisplayingLogin ()
     establishActionCableConnection()
     createLayout()
     displayPlayersInGame()
     displayGameBoard()
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
  div.className = 'row'
  ul.className = 'collection with-header'
  titleLi.className = 'collection-header'
  gameLI.className = 'collection-item'
  column9div().append(div)
  div.append(ul)
  ul.append(titleLi)
  ul.append(gameLI)

}

const displayPlayersInGame = function() {
  fetch('http://127.0.0.1:3000/players.json')
    .then(response => response.json())
    .then(json => { 
      console.log(`this is the fetch ${json} data`)
      json.forEach( player => nameBoxCreator(player))
      sendNameFetch()
    })
    .catch((error) => {
      console.error('error:', error)
    })
}


const stopDisplayingLogin = () => {
  userLogInDiv().style.display = "none"
}

const nameBoxCreator = (data) => {
    console.log('creating the player box')
    const nameBoxDiv = document.createElement('div')
    const div1InsideOfBoxDiv = document.createElement('div')
    const div2InsideOfBoxDiv = document.createElement('div')
    const nameBoxSpan = document.createElement('span')
    nameBoxDiv.className = "row"
    div1InsideOfBoxDiv.className = 'col s4 m5'
    div2InsideOfBoxDiv.className = 'card-panel teal'
    nameBoxSpan.className = 'white-text'
    nameBoxSpan.innerText = data.name
    column3div().append(nameBoxDiv)
    nameBoxDiv.append(div1InsideOfBoxDiv)
    div1InsideOfBoxDiv.append(div2InsideOfBoxDiv)
    div2InsideOfBoxDiv.append(nameBoxSpan)
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

function sendNameFetch() {
  const strongParamsPlayer = {
    player: {
      name: inputForm().value
    }
  } 

  fetch('http://127.0.0.1:3000/players', {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(strongParamsPlayer)
    }
  )
}
function establishActionCableConnection() {
  cable.subscriptions.create('GameRoomChannel', {
    connected() {
      console.log("connected to the room")
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      console.log(`This is the received data: ${data}`)
      nameBoxCreator(data)
    },
    
  });
}
