import React, { Component } from "react"
import "./App.css"
import { Sidebar } from "./containers/Sidebar"
import { MessagesList } from "./containers/MessagesList"
import { AddMessage } from "./containers/AddMessage"
import { Information } from "./containers/Information"

class App extends Component {
  constructor(props) {
    super(props);
    this.user=this.props.user;
    this.room=this.props.room;
    console.log(this.user);
  }

  render() {
    return (
      <div className="container-fluid">
	<div className="col-4">
        <Sidebar />
	</div>
	<div className="col-8">
        <section id="main">
		<Information/>
          <MessagesList />
          <AddMessage />
        </section>
	</div>
      </div>
    );
  }
}

export default App
