import {column3div, allPlayer, inputForm} from './index'
import GameRoom, { gameRoomInstance } from './gameRoom'
export const HEADERS = {
  'Content-Type': 'application/json',
  'Accept' : 'application/json',
};
export let player = undefined 
export const getNameBox = (playerId) => document.getElementById(playerId) 
const currentPlayerLI = () => document.querySelector('#col9 > div > ul > li:nth-child(3)')

class Player {
  constructor(id, name, turnCounter, gameNameforTurnCounter) {
    this.id = id;
    this.name = name;
    this.turnCounter = turnCounter
    this.gameNameforTurnCounter = gameNameforTurnCounter
  }

  static create(id, name, turnCounter, gameNameforTurnCounter) {
   
    player = new Player(id, name, turnCounter, gameNameforTurnCounter)
    
    allPlayer.addPlayer(player);
    
    return player
  }
  
  static getPlayers() {
    fetch('http://127.0.0.1:3000/players.json')
    .then(response => response.json())
    .then(json => { 
     
      json.forEach( player => {
    
        let createdPlayer = Player.create(player.id, player.name, player.turnCounter, player.gameNameforTurnCounter)
        Player.nameBoxCreator(player)
        if (createdPlayer.turnCounter) {
          Player.renderGameCounter(createdPlayer)
        }

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
    nameBoxSpan.className = 'white-text'
    nameBoxSpan.setAttribute("id", data.id)
    nameBoxSpan.innerText = data.name
    column3div().append(nameBoxDiv)
    nameBoxDiv.append(div1InsideOfBoxDiv)
    div1InsideOfBoxDiv.append(div2InsideOfBoxDiv)
    div2InsideOfBoxDiv.append(nameBoxSpan)
  }

  static renderGameCounter(player) {
    const nameBox = getNameBox(player.id)
    const pGameName = document.createElement('p')
    const pGameTurns = document.createElement('p')
    pGameName.className = "white-text"
    pGameTurns.className = 'white-text'
    pGameName.innerText = player.gameNameforTurnCounter
    pGameTurns.innerText = `${player.turnCounter} rounds left`
    nameBox.append(pGameName)
    nameBox.append(pGameTurns)
    player.turnCounter = turnCounter
  }

  
}

export default Player