import { connect } from 'react-redux'
import InformationComponent from '../components/Information'

export const Information = connect(state => (
  state.message,
  state.typemsg
), {})(InformationComponent)
