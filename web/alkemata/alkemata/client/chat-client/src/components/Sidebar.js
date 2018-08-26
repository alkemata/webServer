import React from 'react'

const SidebarComponent = ({ users, kernels }) => (
  <aside id="sidebar" className="sidebar">
    <div className="inbox_chat">
      <div className="chat_list active_chat">
        {users.map(user => (
          <div className="chat_people" key='{user}'>

            <div className="chat_ib">
              <h5>{user}</h5>

            </div>
          </div>

        ))}
      </div>
    </div>
  </aside>
)

export default SidebarComponent