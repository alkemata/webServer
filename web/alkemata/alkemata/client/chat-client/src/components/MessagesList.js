import React from 'react'
import PropTypes from 'prop-types'
import Message from './Message'

const MessagesListComponent = ({ messages }) => (
  <section id="messages-list">
    <ul>
      {messages.map(message => (
        <Message
          key={message.id}
          {...message}
        />
      ))}
    </ul>
  </section>
)

MessagesListComponent.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default MessagesListComponent
