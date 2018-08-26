import { connect } from 'react-redux'
import SidebarComponent from '../components/Sidebar'
import { toJS } from './toJS'

export const Sidebar = connect(state => ({
  users: state.get('users'),
  kernels: state.get('kernels')
}), {})(toJS(SidebarComponent))
