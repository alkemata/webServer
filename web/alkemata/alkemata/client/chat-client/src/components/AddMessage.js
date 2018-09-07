import React from 'react'
import {Display} from '@nteract/display-area'

class AddMessageComponent extends React.Component {
  constructor(props) {
    super(props);
    this._handleEditor = this._handleEditor.bind(this);
    this._onSendClick = this._onSendClick.bind(this);
    this._onKernelClick = this._onKernelClick.bind(this);
    this._handleMode = this._handleMode.bind(this);
    this._handleKernel = this._handleKernel.bind(this);
    this.state = {
      editorState: "",
      selectedKernel: 'None',
      mode: 'raw'
    };
  }

  componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.kernels.toJS()[0] !== this.state.selectedKernel) {
      this.setState({ selectedKernel: nextProps.kernels.toJS()[0] });
    }
  }
  _handleEditor(event) {
    this.setState({ editorState: event.currentTarget.value });
  }

  _onSendClick(event) {
    event.preventDefault()
    let text = this.state.editorState;
    let kernel=this.state.selectedKernel;
    let outputs=this.props.editor.get('results');
    let message={type:this.state.mode, text:text, output:outputs}
    this.props.dispatchMessage(message,kernel);
    this.setState({ editorState: "" });
  }

  _handleMode(event) {
    this.setState({ mode: event.currentTarget.value });
  }

  _handleKernel(event) {
    this.setState({ selectedKernel: event.currentTarget.value })
  }

  _onKernelClick(event) {
    event.preventDefault()
    let text = this.state.editorState;
    this.props.dispatchCommand(text, this.state.selectedKernel);
    //  this.props.dispatch(convertToRaw(this.state.editorState.getCurrentContent()), 'Me');
  }

  displayKernels(kernels) {
    if (kernels.length == 0) { return null }
    else {
      const listItems = kernels.map((kernel) =>
        <option value={kernel}>{kernel}</option>
      );
      return (
        <div className="form-group col-md-4">
          <label>Kernel
          <select id="inputKernel" className="form-control" value={this.state.selectedKernel} onChange={this._handleKernel}>
              {listItems}
            </select>
          </label>
        </div>
      )
    }
  };

  displayKernelButton(type) {
    if (this.state.mode == "raw") { console.log('no button'); return null }
    else {
      return (
        <button onClick={this._onKernelClick} className="btn btn-primary">>Evaluate</button>
      )
    }
  }

  displayResult(results) {
    if (results.length > 0) {return (<Display outputs={results} />) }
    else {  return <div></div>; }
  }

  render() {
    return(
    <form className="w-100">
      <div className="form-group w-100">
        <textarea className="w-100" id="editor" rows="4" onChange={this._handleEditor} value={this.state.editorState} />
      </div>
      <div className="form-inline">
        <button onClick={this._onSendClick} className="btn btn-primary mb-2 mr-sm-2">>Send</button>
        {this.displayKernelButton(this.state.mode)}
        <label>Mode
            <select id="inputMode" className="form-control" value={this.state.mode} onChange={this._handleMode}>
            <option value='raw'>raw</option>
            <option value='code'>code</option>
          </select>
        </label>
        {this.displayKernels(this.props.kernels)}
      </div>
      {this.displayResult(this.props.editor.get('results').toArray())}
    </form>
    )
  }
}


export default AddMessageComponent
