import React from 'react'
import PropTypes from 'prop-types'


class Information extends React.Component {
  constructor(props) {
    super(props);
    this.message = this.props.message;
    this.typ = this.props.typ;
  }
  renderMsg(msg) {
    if (this.typ === 'info') {
      return (
        <div class="alert alert-primary alert-dismissible fade show" role="alert">
          {msg}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
    if (this.typ === 'alert') {
      return (<div class="alert alert-danger primary alert-dismissible fade show" role="alert">
        {msg}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>);
    }
  }

  render() {
    return (
      <section id="information">

        {this.renderMsg(this.message)}

      </section>
    )
  }
}

Information.propTypes = {
  message: PropTypes.string.isRequired,
  typ: PropTypes.string.isRequired
}

export default Information
