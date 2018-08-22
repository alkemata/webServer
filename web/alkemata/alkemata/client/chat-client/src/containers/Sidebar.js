import { connect } from 'react-redux'
import SidebarComponent from '../components/Sidebar'

export const Sidebar = connect(state => ({
  users: state.get('listUsers'),
  kernels: state.get('listKernels')
}), {})(SidebarComponent)
