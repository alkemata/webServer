import React from 'react'
import PropTypes from 'prop-types'


const Information = ({ message,typ }) => (
renderMsg(msg) {
if (typ==='info') {
return (
<div class="alert alert-primary alert-dismissible fade show" role="alert">
{msg}
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div>
);}
if (typ==='alert')  {return <div class="alert alert-danger primary alert-dismissible fade show" role="alert">
  A simple danger alert—check it out!
{msg}
    <span aria-hidden="true">&times;</span>
  </button>
</div>);}}
else {}
}


return(
  <section id="information">

{this.renderMsg(message)}

  </section>
);
)

MessagesList.propTypes = {
  message: PropTypes.string.isRequired,
    typ: PropTypes.string.isRequired
}

export default Information
