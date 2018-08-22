import React from 'react'
import PropTypes from 'prop-types'

const SidebarComponent = ({ users }) => (
  <aside id="sidebar" className="sidebar">
    <ul>
      {users.map(user => (
        <li>{user.name}</li>
      ))}
    </ul>
  </aside>
)

export default SidebarComponent