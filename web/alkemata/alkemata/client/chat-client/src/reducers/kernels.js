import * as types from '../constants/ActionTypes'

const kernels= (state = [], action) => {
  switch (action.type) {
    case types.KERNELS_LIST:
      return action.users
    default:
      return state
  }
}

export default kernels
