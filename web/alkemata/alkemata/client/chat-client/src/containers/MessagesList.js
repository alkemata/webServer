import { connect } from 'react-redux'
import MessagesListComponent from '../components/MessagesList'
import { toJS } from './toJS'

export const MessagesList = connect(state => ({
  messages: state.get('messages')
}), {})(MessagesListComponent)
