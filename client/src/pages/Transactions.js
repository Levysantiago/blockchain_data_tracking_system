import React, { Component } from "react";
import NavBar from "../components/NavBar";
import ListFermentations from "../components/ListFermentations";
import api from "../services/GetDataService";
import ListTransactions from "../components/ListTransactions";
import qrcode from "qrcode-generator";
import QrCode from "../components/QrCode";
const lang = require("../lang/pt");

class Transactions extends Component {
  state = {
    loader: false,
    loader_transactions: false,
    loader_qrcode: false,
    loaderFermentationMsg: "Carregando Fermentações",
    loaderTrxMsg: "Carregando Transações",
    loader_qrcode_msg: "Carregando QrCode",
    transactions: [],
    fermentations: [],
    qrcode_tag: null
  };

  async getTransactions(id) {
    let response = await api.getTransactionsByFermentation(id);
    console.log(response);

    if ((await response.status) === 200) {
      const json = await response.json();
      this.setState({ transactions: json });
      console.log("agora");
      console.log(this.state.transactions);
    }
  }

  async getFermentations() {
    this.setState({ loader: true });
    let response = await api.getFermentations();

    if ((await response.status) === 200) {
      this.setState({ loader: false });
      const json = await response.json();
      this.setState({ fermentations: json });
      //console.log(this.state.fermentations);
    }
  }

  createQrcode = url => {
    let qr = qrcode(4, "L");
    qr.addData(url);
    qr.make();
    this.setState({
      qrcode_tag: qr.createImgTag(8, 4, "QrCode")
    });
  };

  handleFermentationClick = async id => {
    let fermentation = this.state.fermentations[id];

    // Reseting transactions
    this.setState({ transactions: [], qrcode_tag: null });

    // If fermentation already has some information
    if (fermentation.trxs) {
      this.setState({ loader_transactions: true, loader_qrcode: true });
      // Selecting the transactions based on fermentation id
      await this.getTransactions(fermentation.id);
      this.setState({ loader_transactions: false, loader_qrcode: false });

      // Generating QrCode based on blockstart and blockend
      const qrcode_string = await api.external_route(fermentation.id);

      this.createQrcode(qrcode_string);
    }
  };

  async componentDidMount() {
    //await this.getTransactions();
    await this.getFermentations();
  }

  componentDidUpdate() {
    if (this.state.qrcode_tag) {
      document.getElementById("placeHolder").innerHTML = this.state.qrcode_tag;
    } else {
      document.getElementById("placeHolder").innerHTML = "<div/>";
    }
  }

  render() {
    const {
      loader,
      loader_transactions,
      loader_qrcode,
      loaderTrxMsg,
      loaderFermentationMsg,
      loader_qrcode_msg,
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
          <ListFermentations
            title={"Últimas fermentações"}
            list={fermentations}
            loader={loader}
            loaderMsg={loaderFermentationMsg}
            onClick={this.handleFermentationClick}
            height={400}
          />
          <QrCode loader={loader_qrcode} loader_msg={loader_qrcode_msg} />
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
