import React from 'react'
import PropTypes from 'prop-types'

import {Editor, EditorState, convertToRaw} from 'draft-js';


class AddMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
}

  _onSendClick() {
    props.dispatch(convertToRaw(editorState.getCurrentContent()), 'Me')
  }

  render() {
    return (
      <div>
        <button onClick={this._onSendClick.bind(this)}>Send</button>
      <Editor
        editorState={this.state.editorState}
      />
</div>
    );
  }
}




AddMessage.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default AddMessage
