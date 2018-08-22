import * as types from '../constants/ActionTypes'

let nextMessageId = 0
const nextUserId = 0

export const addMessage = (message, author) => ({
  type: types.ADD_MESSAGE,
  id: nextMessageId++,
  message:message,
  author:author
})

export const messageReceived = (message, author) => ({
  type: types.MESSAGE_RECEIVED,
  id: nextMessageId++,
  message:message,
  author:author
})

export const populateUsersList = users => ({
  type: types.USERS_LIST,
  users:users
})

export const displayInfo = (message,typemsg) => ({
  type: types.DISPLAY_INFO,
  message:message,
  typemsg:typemsg
})