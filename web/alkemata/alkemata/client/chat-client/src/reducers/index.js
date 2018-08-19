import { combineReducers } from 'redux'
import messages from './messages'
import users from './users'
import info from './info'
import EditorState from 'draft-js';

const defaultState = {
  editorState: EditorState.createEmpty(),
listMessages: {}
};

const reducers = combineReducers({
  messages,
  users,
info
})

export default reducers
