import * as types from '../constants/ActionTypes'
import {List} from 'immutable'

const users = (state = [], action) => {
  switch (action.type) {
    case types.USERS_LIST:
      var state2=state.set('users',List(action.users));
      console.log(state2.toJS());
      return state2
    default:
      return state
  }
}

export default users
