import { connect } from 'react-redux'
import AddMessageComponent from '../components/AddMessage'
import { addMessage } from '../actions'
import { toJS } from './toJS'

const mapDispatchToProps = dispatch => ({
  dispatchMessage: (message) => {
    dispatch(addMessage(message))
  }
})

export const AddMessage = connect((state) => ({  kernels: state.get('kernels')}),
 mapDispatchToProps)(toJS(AddMessageComponent))
