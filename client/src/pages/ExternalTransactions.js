import React, { Component } from "react";
import api from "../services/GetDataService";
import ListTransactions from "../components/ListTransactions";
const lang = require("../lang/pt");

class ExternalTransactions extends Component {
  state = {
    loader: false,
    loader_msg: "Carregando Transações",
    transactions: []
  };

  async getTransactions(list_id) {
    this.setState({ loader: true });
    let response = await api.getFermentations();
    if ((await response.status) === 200) {
      const fermentations = await response.json();

      const size = fermentations.length;
      if (size && fermentations[list_id]) {
        response = await api.getTransactionsByFermentation(
          fermentations[list_id].id
        );

        if ((await response.status) === 200) {
          const json = await response.json();
          this.setState({ transactions: json });
        }
      }
    }
    this.setState({ loader: false });
  }

  async componentDidMount() {
    const { id: list_id } = this.props.match.params;
    await this.getTransactions(list_id);
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
