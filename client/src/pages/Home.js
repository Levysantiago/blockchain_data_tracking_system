import React, { Component } from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import ListTransactions from "../components/ListTransactions";
import get_data_service from "../services/GetDataService";
const lang = require("../lang/pt");

class App extends Component {
  state = {
    temperature: "",
    humidity: "",
    loader: true,
    loaderMeasuresMsg: "Carregando Medidas",
    loaderTrxMsg: "Carregando Transações",
    transactions: []
  };

  async getLastMeasures() {
    this.setState({ loader: true });
    let response = await get_data_service.getLastMeasures();

    if ((await response.status) === 200) {
      this.setState({ loader: false });
      const json = await response.json();
      this.setState({ temperature: json.data.temperature + "ºC" });
      this.setState({ humidity: json.data.humidity + "%" });
    }
  }

  async getTransactions() {
    this.setState({ loader: true });
    let response = await get_data_service.getTransactions();

    if ((await response.status) === 200) {
      this.setState({ loader: false });
      const json = await response.json();
      this.setState({ transactions: json.data });
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
            <h1 className="App-title">{lang.menu.home.ITEM}</h1>
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
            height={400}
          />
        </div>
      </div>
    );
  }
}

export default App;
