import React, { Component } from "react";
import NavBar from "../components/NavBar";
import ListFermentations from "../components/ListFermentations";
import get_data_service from "../services/GetDataService";
import ListTransactions from "../components/ListTransactions";
const lang = require("../lang/pt");

class Transactions extends Component {
  state = {
    loader: "hide",
    loaderMeasuresMsg: "Carregando Medidas",
    loaderTrxMsg: "Carregando Transações",
    transactions: []
  };

  async getTransactions() {
    this.setState({ loader: "active" });
    let response = await get_data_service.getTransactions();

    if ((await response.status) === 200) {
      this.setState({ loader: "" });
      const json = await response.json();
      this.setState({ transactions: json });
      console.log(this.state.transactions);
    }
  }

  async componentDidMount() {
    await this.getTransactions();
  }

  render() {
    const { loader, loaderTrxMsg, transactions } = this.state;

    return (
      <div>
        <NavBar lang={lang} />
        <div className="container row">
          <header className="center">
            <h1 className="App-title">{lang.menu.transactions.ITEM}</h1>
          </header>
          <ListFermentations
            title={"Últimas fermentações"}
            list={[1, 2, 3]}
            height={400}
          />
          <ListTransactions
            title={"Últimas transações"}
            transactions={transactions}
            loader={loader}
            loaderMsg={loaderTrxMsg}
            height={800}
          />
        </div>
      </div>
    );
  }
}

export default Transactions;
