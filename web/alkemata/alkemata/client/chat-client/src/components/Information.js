import React from 'react'


class InformationComponent extends React.Component {
 
  renderMsg(msg) {
    return (
      <textarea className="form-control" aria-label="With textarea" rows="3" readOnly value={msg} />
    );

  }

  render() {
    return (
      <div className="input-group w-100">
        <div className="input-group-prepend">
          <span className="input-group-text">Console</span>
        </div>
        {this.renderMsg(this.props.message)}
      </div>
    )
  }
}


export default InformationComponent
