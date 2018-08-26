import * as types from '../constants/ActionTypes'
import {List} from 'immutable'

const kernels= (state = [], action) => {
  switch (action.type) {
    case types.KERNELS_LIST:
      var state2=List(action.users);
      return state2
     case types.ADD_KERNEL:
	 return state.push(action.kernel);
    default:
      return state
  }
}

export default kernels
