import React, { Component } from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import ListTransactions from "../components/ListTransactions";
const lang = require("../lang/pt");

class App extends Component {
  render() {
    return (
      <div>
        <NavBar lang={lang} />
        <div className="container row">
          <header className="center">
            <h1 className="App-title">Dashboard</h1>
          </header>
          <Card
            title={"Temperatura"}
            imgSrc={"https://img.icons8.com/nolan/80/temperature.png"}
            data={"46ºC"}
          />
          <Card
            title={"Umidade"}
            imgSrc={"https://img.icons8.com/ultraviolet/80/000000/humidity.png"}
            data={"26%"}
          />

          <ListTransactions
            title={"Últimas transações"}
            list={["item 1", "item 2", "item 2", "item 2"]}
          />
        </div>
      </div>
    );
  }
}

export default App;
