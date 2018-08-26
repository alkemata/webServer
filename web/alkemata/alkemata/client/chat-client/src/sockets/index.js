import * as types from '../constants/ActionTypes'
import { messageReceived, populateUsersList, displayInfo, addUser, kernelResult, addKernel } from '../actions'

const setupSocket = (dispatch, room) => {
  const socket = new WebSocket('wss://192.168.56.2/ws/chat/' + room + '/')

  socket.onopen = () => {
    console.log('opening socket');
    socket.send(JSON.stringify({
      command: 'join',
      room: room
    }))
  }
  socket.onmessage = (event) => {
    console.log('receiving message from websocket');
    const data = JSON.parse(event.data)
    console.log(data);
    switch (data.command) {
      case types.MESSAGE_RECEIVED:
        dispatch(messageReceived(data.message, data.author))
        break
      case types.USERS_LIST:
        dispatch(populateUsersList(data.userList))
        break
      case types.INFO:
        dispatch(displayInfo(data.message))
        break
      case types.ADD_USER:
        dispatch(addUser(data.user))
        break
      case types.ADD_KERNEL:
        dispatch(addKernel(data.kernel))
        break
      case types.KERNEL_RESULT:
        dispatch(kernelResult(data.kernel, data.result))
        break
      default:
        break
    }
  }

  return socket
}

export default setupSocket
