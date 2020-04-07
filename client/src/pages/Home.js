import React, { Component } from "react";
import NavBar from "../components/NavBar";
const lang = require("../lang/pt");

class App extends Component {
  render() {
    return (
      <div>
        <NavBar lang={lang} />
        <header className="center">
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    );
  }
}

export default App;
