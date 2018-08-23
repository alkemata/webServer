import { connect } from 'react-redux'
import SidebarComponent from '../components/Sidebar'

export const Sidebar = connect(state => ({
  users: state.get('users'),
  kernels: state.get('kernels')
}), {})(SidebarComponent)
