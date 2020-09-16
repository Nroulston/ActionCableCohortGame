import {column3div, allPlayer, inputForm} from './index'
import GameRoom, { gameRoomInstance } from './gameRoom'
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept' : 'application/json',
};

const currentPlayerLI = () => document.querySelector('#col9 > div > ul > li:nth-child(3)')

class Player {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  static create(id, name) {
   
    let player = new Player(id, name)
    
    allPlayer.addPlayer(player);
    
    return player
  }
  
  static getPlayers() {
    fetch('http://127.0.0.1:3000/players.json')
    .then(response => response.json())
    .then(json => { 
      // console.log(`this is the fetch ${json} data`)
      json.forEach( player => {
       console.log(player)
        Player.nameBoxCreator(player)
        Player.create(player.id, player.name)
      })
       Player.sendNameFetch()
    })
    .catch((error) => {
      console.error('error:', error)
    })
  }
  
  static sendNameFetch() {
    
    const strongParamsPlayer = {
      player: {
        name: inputForm().value
      }
    } 
  
    fetch('http://127.0.0.1:3000/players', {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(strongParamsPlayer)
      })
      .then(response => response.json())
      .then(json => { 
       
        Player.create(json.id, json.name)
        GameRoom.startGames(json)
        
       
      })
  }

  static renderCurrentPlayer() {
    currentPlayerLI().innerText = `It is currently ${gameRoomInstance.currentTurnPlayer.name}'s turn`
   
  }

  static nameBoxCreator(data) {
    const nameBoxDiv = document.createElement('div')
    const div1InsideOfBoxDiv = document.createElement('div')
    const div2InsideOfBoxDiv = document.createElement('div')
    const nameBoxSpan = document.createElement('span')
    nameBoxDiv.className = "row"
    div2InsideOfBoxDiv.className = `card-panel teal`
    div2InsideOfBoxDiv.setAttribute("id", data.id)
    nameBoxSpan.className = 'white-text'
    nameBoxSpan.innerText = data.name
    column3div().append(nameBoxDiv)
    nameBoxDiv.append(div1InsideOfBoxDiv)
    div1InsideOfBoxDiv.append(div2InsideOfBoxDiv)
    div2InsideOfBoxDiv.append(nameBoxSpan)
  }
}

export default Player