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
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Console</span>
        </div>
        <textarea class="form-control" aria-label="With textarea" rows="6" readonly>msg</textarea>
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

InformationComponent.propTypes = {
  message: PropTypes.string.isRequired,
  typ: PropTypes.string.isRequired
}

export default InformationComponent
