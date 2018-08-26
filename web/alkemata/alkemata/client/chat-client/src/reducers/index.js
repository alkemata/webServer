import { combineReducers } from 'redux-immutable'
import messages from './messages'
import users from './users'
import kernels from './kernels'
import info from './info'


const reducers = combineReducers({
  messages:messages,
  info:info,
  users:users,
  kernels:kernels
})

export default reducers
