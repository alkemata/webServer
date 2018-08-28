import * as types from '../constants/ActionTypes'


export const addMessage = (message) => ({
  type: types.ADD_MESSAGE,
  message: message
})

export const kernelCommand = (command,kernel) => ({
  type: types.KERNEL_COMMAND,
  command: command,
  kernel: kernel
})

export const activeKernel = (kernel) => ({
  type: types.ACTIVE_KERNEL,
  kernel: kernel
})


export const kernelResult = ( result) => ({
  type: types.KERNEL_RESULT,
  result: result,
})

export const addUser = (user) => ({
  type: types.ADD_USER,
  user: user
})

export const addKernel = (kernel) => ({
  type: types.ADD_KERNEL,
  kernel: kernel
})

export const messageReceived = (message, author) => ({
  type: types.MESSAGE_RECEIVED,

  message: message,
  author: author
})

export const populateUsersList = users => ({
  type: types.USERS_LIST,
  users: users
})

export const populateKernelsList = kernels => ({
  type: types.KERNELS_LIST,
  kernels: kernels
})

export const displayInfo = (message) => ({
  type: types.DISPLAY_INFO,
  message: message
})

export const changeMode = (mode) => ({
  type: types.CHANGE_MODE,
  mode: mode
})

export const changeKernelState = (state) => ({
  type: types.CHANGE_KERNEL_STATE,
  state: state
})