import { connect } from 'react-redux'
import InformationComponent from '../components/Information'
import { toJS } from './toJS'

export const Information = connect(state => ({
  message: state.get('info')
}
), {})(toJS(InformationComponent))

