import React, { Component } from "react"
import "./App.css"
import { Sidebar } from "./containers/Sidebar"
import { MessagesList } from "./containers/MessagesList"
import { AddMessage } from "./containers/AddMessage"
import { Information } from "./containers/Information"

class App extends Component {
  constructor(props) {
    super(props);
    this.user = this.props.user;
    this.room = this.props.room;
    console.log(this.user);
  }

  render() {
    return (
      <div className="container_message">
        <div className="row">
          <div className="col-lg-4">
            <Sidebar />
          </div>
          <div className="col-lg-8">
            <div className="row">
              <Information />
            </div>
            <div className="row">
              <MessagesList />
            </div>
            <div className="row">
              <AddMessage />
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default App
