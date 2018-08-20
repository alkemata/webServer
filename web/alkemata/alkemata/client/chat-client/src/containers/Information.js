import { connect } from 'react-redux'
import InformationComponent from '../components/Information'

export const Information = connect(state => ({
  message: state.message,
  typemsg: state.typemsg}
), {})(InformationComponent)

