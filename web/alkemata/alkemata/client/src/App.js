import React, { Component } from "react"
import "./App.css"
import { Sidebar } from "./containers/Sidebar"
import { MessagesList } from "./containers/MessagesList"
import { AddMessage } from "./containers/AddMessage"
import { Information } from "./containers/Information"

class App extends Component {
  render() {
    return (
      <div class="container-fluid">
	<div class="col-4">
        <Sidebar />
	</div>
	<div class="col-8">
        <section id="main">
		<Information/>
          <MessagesList />
          <AddMessage />
        </section>
	</div>
      </div>
    )
  }
}

export default App
