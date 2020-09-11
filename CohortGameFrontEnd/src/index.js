
const API_ROOT = 'http://localhost:3000';
const API_WS_ROOT = 'ws://localhost:3000/cable';
const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

import ActionCable from 'actioncable'

var cable = ActionCable.createConsumer('ws://localhost:3000/cable')

cable.subscriptions.create('GameRoomChannel', {
  // connected() {
  //   console.log("connected to the room")
  // },

  // disconnected() {
  //   // Called when the subscription has been terminated by the server
  // },

  // received(data) {
  //   alert(data['message'])
  // },
});