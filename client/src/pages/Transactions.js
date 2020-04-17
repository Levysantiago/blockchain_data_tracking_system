import React, { Component } from "react";
import NavBar from "../components/NavBar";
import ListFermentations from "../components/ListFermentations";
import get_data_service from "../services/GetDataService";
import ListTransactions from "../components/ListTransactions";
import qrcode from "qrcode-generator";
const lang = require("../lang/pt");

class Transactions extends Component {
  state = {
    loader: false,
    loader_transactions: false,
    loaderFermentationMsg: "Carregando Fermentações",
    loaderTrxMsg: "Carregando Transações",
    transactions: [],
    fermentations: []
  };

  async getTransactions(blockstart, blockend) {
    this.setState({ loader_transactions: true });
    let response = await get_data_service.getTransactions(blockstart, blockend);
    console.log(response);

    if ((await response.status) === 200) {
      this.setState({ loader_transactions: false });
      const json = await response.json();
      this.setState({ transactions: json });
      console.log("agora");
      console.log(this.state.transactions);
    }
  }

  async getFermentations() {
    this.setState({ loader: true });
    let response = await get_data_service.getFermentations();

    if ((await response.status) === 200) {
      this.setState({ loader: false });
      const json = await response.json();
      this.setState({ fermentations: json });
      //console.log(this.state.fermentations);
    }
  }

  handleFermentationClick = async id => {
    let fermentation = this.state.fermentations[id];
    if (fermentation) {
      await this.getTransactions(
        fermentation.blockstart,
        fermentation.blockend
      );
    }
  };

  async componentDidMount() {
    //await this.getTransactions();
    await this.getFermentations();

    let typeNumber = 4;
    let errorCorrectionLevel = "L";
    let qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData("Hi!");
    qr.make();
    document.getElementById("placeHolder").innerHTML = qr.createImgTag();
  }

  render() {
    const {
      loader,
      loader_transactions,
      loaderTrxMsg,
      loaderFermentationMsg,
      transactions,
      fermentations
    } = this.state;

    return (
      <div>
        <NavBar lang={lang} />
        <div className="container row">
          <header className="center">
            <h1 className="App-title">{lang.menu.transactions.ITEM}</h1>
          </header>
          <div id="placeHolder"></div>
          <ListFermentations
            title={"Últimas fermentações"}
            list={fermentations}
            loader={loader}
            loaderMsg={loaderFermentationMsg}
            onClick={this.handleFermentationClick}
            height={400}
          />
          <ListTransactions
            title={"Últimas transações"}
            transactions={transactions}
            loader={loader_transactions}
            loaderMsg={loaderTrxMsg}
            height={800}
          />
        </div>
      </div>
    );
  }
}

export default Transactions;
