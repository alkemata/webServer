import { takeEvery,all } from 'redux-saga/effects'
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

const handleKernelCommand = function* handleKernelCommand(params) {
  yield takeEvery(types.KERNEL_COMMAND, (action) => {
    params.socket.send(JSON.stringify(
      {"command":"requestKernel",
      "code":action.command,
      "kernelName":action.kernel,
      "room":params.room
    }))
  })
}

export default function* rootSaga(params) {
  yield all([
    handleKernelCommand(params),
    handleNewMessage()
  ])
}
