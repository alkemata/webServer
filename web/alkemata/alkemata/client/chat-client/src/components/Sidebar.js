import React from 'react'

const SidebarComponent = ({ users,kernels }) => (
  <aside id="sidebar" className="sidebar">
    <ul>
      {users.map(user => (
        <li>{user}</li>
      ))}
    </ul>
  </aside>
)

export default SidebarComponent