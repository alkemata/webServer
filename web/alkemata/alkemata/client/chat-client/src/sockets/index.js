import * as types from '../constants/ActionTypes'
import { messageReceived, populateUsersList,displayInfo } from '../actions'

const setupSocket = (dispatch,room) => {
  const socket = new WebSocket('wss://192.168.56.2/ws/chat/'+room+'/')

  socket.onopen = () => {
    console.log('opening socket');
    socket.send(JSON.stringify({
      type: 'VALIDE_CONNECTION'
    }))
  }
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    switch (data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.author))
        break
      case types.USERS_LIST:
        dispatch(populateUsersList(data.users))
        break
	 case 'INFO':
	   dispatch(displayInfo(data.message,data.type))
	   break
      default:
        break
    }
  }

  return socket
}

export default setupSocket
