
const API_ROOT = 'http://localhost:3000';
const API_WS_ROOT = 'ws://localhost:3000/cable';
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

import ActionCable from 'actioncable'
const cable = ActionCable.createConsumer(API_WS_ROOT)
const body = () => document.querySelector("body")
document.addEventListener("DOMContentLoaded", function() {
  const div = document.createElement("div")
  const formDiv = document.createElement('div')
  const form = document.createElement("FORM")
  const inputDiv = document.createElement("div")
  const inputField = document.createElement('input')
  const inputLabel = document.createElement('label')

  inputField.placeholder = "Name"

  body().append(div)
  div.append(form)
  form.append(formDiv)
  formDiv.append(inputDiv)
  inputDiv.append(inputField)
  inputDiv.append(inputLabel)

})



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

