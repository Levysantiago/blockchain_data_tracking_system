import React, { Component } from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import ListTransactions from "../components/ListTransactions";
const lang = require("../lang/pt");
require("dotenv").config();
const {
  REACT_APP_SERVER_HOST: SERVER_HOST,
  REACT_APP_SERVER_PORT: SERVER_PORT
} = process.env;
const server_url = SERVER_HOST + ":" + SERVER_PORT;

class App extends Component {
  state = {
    temperature: "",
    humidity: "",
    loader: "hide",
    loaderMeasuresMsg: "Carregando Medidas",
    loaderTrxMsg: "Carregando Transações",
    transactions: []
  };

  async getLastMeasures() {
    this.setState({ loader: "active" });
    let response = await fetch(server_url + "/getLastMeasures", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ids: "id",
        sensorname: "DHT11"
      })
    });

    if ((await response.status) === 200) {
      this.setState({ loader: "hide" });
      const json = await response.json();
      this.setState({ temperature: json.temperature + "ºC" });
      this.setState({ humidity: json.humidity + "%" });
    }
  }

  async getTransactions() {
    this.setState({ loader: "active" });
    let response = await fetch(server_url + "/getTransactions", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ids: "id",
        sensorname: "DHT11"
      })
    });

    if ((await response.status) === 200) {
      this.setState({ loader: "" });
      const json = await response.json();
      this.setState({ transactions: json });
      console.log(this.state.transactions);
    }
  }

  async componentDidMount() {
    await this.getLastMeasures();
    await this.getTransactions();
  }

  render() {
    const {
      temperature,
      humidity,
      loader,
      loaderMeasuresMsg,
      loaderTrxMsg,
      transactions
    } = this.state;

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
            data={temperature}
            loader={loader}
            loaderMsg={loaderMeasuresMsg}
          />
          <Card
            title={"Umidade"}
            imgSrc={"https://img.icons8.com/ultraviolet/80/000000/humidity.png"}
            data={humidity}
            loader={loader}
            loaderMsg={loaderMeasuresMsg}
          />

          <ListTransactions
            title={"Últimas transações"}
            transactions={transactions}
            loader={loader}
            loaderMsg={loaderTrxMsg}
          />
        </div>
      </div>
    );
  }
}

export default App;
