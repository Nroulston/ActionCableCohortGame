
const API_ROOT = 'http://localhost:3000';
const API_WS_ROOT = 'ws://localhost:3000/cable';
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

import ActionCable from 'actioncable'
const cable = ActionCable.createConsumer(API_WS_ROOT)
const body = () => document.querySelector("body")
const inputForm = () => document.querySelector("#user_name")
const submitName = () => { 
 inputForm().addEventListener('keydown', function(e) {
   if (e.keyCode == 13) {
     e.preventDefault()
     establishActionCableConnection()
     console.log(e)
   } 
 })
}


document.addEventListener("DOMContentLoaded", function() {
  const div = document.createElement("div")
  const formDiv = document.createElement('div')
  const form = document.createElement("FORM")
  const inputDiv = document.createElement("div")
  const inputField = document.createElement('input')
  const inputLabel = document.createElement('label')
  inputField.placeholder = "Enter Name"
  inputField.setAttribute("id", "user_name")
  inputField.setAttribute("name", "user[name]")
  inputLabel.setAttribute("for", "user_name")
  inputLabel.innerText = "First Name"
  body().append(div)
  div.append(form)
  form.append(formDiv)
  formDiv.append(inputDiv)
  inputDiv.append(inputLabel)
  inputDiv.append(inputField)

  submitName()

})


function establishActionCableConnection() {
  cable.subscriptions.create('GameRoomChannel', {
    connected() {
      console.log("connected to the room")
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      alert(data['message'])
    },
  });
}
