import React from 'react'
import PropTypes from 'prop-types'


class InformationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.message = this.props.message;
    this.typ = this.props.typmsg;
  }
  renderMsg(msg) {
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text">Console</span>
        </div>
        <textarea className="form-control" aria-label="With textarea" rows="6" readOnly>msg</textarea>
      </div>
    );

  }

  render() {
    return (
      <section id="information">

        {this.renderMsg(this.message)}

      </section>
    )
  }
}


export default InformationComponent
