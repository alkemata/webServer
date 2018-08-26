import React from 'react'
import NotebookPreview from "@nteract/notebook-preview";

const MessagesListComponent = ({ messages }) => (

 <div className="inbox_chat w-100">
<NotebookPreview
  notebook={messages}
/>
</div>
)


export default MessagesListComponent
