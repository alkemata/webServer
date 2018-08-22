import * as types from '../constants/ActionTypes'
import { messageReceived, populateUsersList,displayInfo } from '../actions'

const setupSocket = (dispatch,room) => {
  const socket = new WebSocket('wss://192.168.56.2/ws/chat/'+room+'/')

  socket.onopen = () => {
    console.log('opening socket');
    socket.send(JSON.stringify({
      command: 'join',
      room: room
    }))
  }
  socket.onmessage = (event) => {
    console.log('receiving message');
    const data = JSON.parse(event.data)
    console.log(data);
    switch (data.command) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.author))
        break
      case types.USERS_LIST:
      console.log('receiving userList');
        dispatch(populateUsersList(data.userList))
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
