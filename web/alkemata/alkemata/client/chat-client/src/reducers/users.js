import * as types from '../constants/ActionTypes'
import Immutable from 'immutable'

const users = (state =[], action) => {
  switch (action.type) {
    case types.USERS_LIST:
     state=Immutable.List(action.users);
      return state
     case types.ADD_USER:
	 return state.push(action.user);
    default:
      return state
  }
}

export default users
