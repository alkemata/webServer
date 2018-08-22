import { combineReducers } from 'redux-immutable'
import messages from './messages'
import users from './users'
import kernels from './kernels'
import info from './info'


const reducers = combineReducers({
  messages,
  info,
  users,
kernels
})

export default reducers
