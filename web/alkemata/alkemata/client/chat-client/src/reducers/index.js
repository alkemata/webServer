import { combineReducers } from 'redux'
import messages from './messages'
import users from './users'
import info from './info'


const reducers = combineReducers({
  messages,
  users,
info
})

export default reducers
