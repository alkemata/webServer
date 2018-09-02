import * as types from '../constants/ActionTypes'
import {createImmutableOutput} from '@nteract/commutable'

const editor = (state = [], action) => {
  switch (action.type) {
    case types.CHANGE_KERNEL_STATE:
      return state.set("state", action.state);
    case types.KERNEL_RESULT:

      let output=createImmutableOutput(action.result);
      return state.set('results',state.get('results').push(output))
  
    default:
      return state
  }
}

export default editor