import * as types from '../constants/ActionTypes'
import { messageReceived, populateUsersList,display_info } from '../actions'

const setupSocket = (dispatch) => {
  const socket = new WebSocket('ws://localhost:8989')

  socket.onopen = () => {
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
	   dispatch(display_info(data.message,data.type))
	   break
      default:
        break
    }
  }

  return socket
}

export default setupSocket
