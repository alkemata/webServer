import { takeEvery } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'

const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(types.ADD_MESSAGE, (action) => {
    params.socket.send(JSON.stringify(
      {"command":"sendMessage",
      "message":action.message,
      "room":params.room
    }))
  })
}

export default handleNewMessage