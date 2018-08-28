import { connect } from 'react-redux'
import AddMessageComponent from '../components/AddMessage'
import { addMessage,kernelCommand } from '../actions'
import { toJS } from './toJS'

const mapDispatchToProps = dispatch => ({
  dispatchMessage: (message) => {
    dispatch(addMessage(message))
  },
  dispatchCommand: (message,kernel) =>{
    dispatch(kernelCommand(message,kernel))
  }
})

export const AddMessage = connect((state) => ({  kernels: state.get('kernels'), editor:state.get('editor')}),
 mapDispatchToProps)(AddMessageComponent)
