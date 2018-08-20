import React from 'react'
import PropTypes from 'prop-types'

import { Editor, EditorState, convertToRaw } from 'draft-js';


class AddMessageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
  }

  _onSendClick() {
    this.props.dispatch(convertToRaw(this.state.editorState.getCurrentContent()), 'Me')
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




AddMessageComponent.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default AddMessageComponent
