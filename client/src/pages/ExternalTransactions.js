import React, { Component } from "react";
import get_data_service from "../services/GetDataService";
import ListTransactions from "../components/ListTransactions";
const lang = require("../lang/pt");

class ExternalTransactions extends Component {
  state = {
    loader: false,
    loader_msg: "Carregando Transações",
    transactions: [],
    fermentations: []
  };

  async getTransactions(blockstart, blockend) {
    this.setState({ loader: true });
    let response = await get_data_service.getTransactions(blockstart, blockend);

    if ((await response.status) === 200) {
      this.setState({ loader: false });
      const json = await response.json();
      this.setState({ transactions: json });
    }
  }

  async componentDidMount() {
    const { blockstart, blockend } = this.props.match.params;
    await this.getTransactions(blockstart, blockend);
  }

  render() {
    const { loader, loader_msg, transactions } = this.state;

    return (
      <div className="container row">
        <header className="center">
          <h1 className="App-title">{lang.menu.transactions.ITEM}</h1>
        </header>
        <ListTransactions
          title={"Últimas transações"}
          transactions={transactions}
          loader={loader}
          loaderMsg={loader_msg}
          height={800}
        />
      </div>
    );
  }
}

export default ExternalTransactions;
