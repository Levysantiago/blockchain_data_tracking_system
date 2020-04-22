import React, { Component } from "react";
import NavBar from "../components/NavBar";
import ListFermentations from "../components/ListFermentations";
import Chart from "../components/Chart";
import ListTransactions from "../components/ListTransactions";
import api from "../services/GetDataService";
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
    qrcode_tag: null,
    graphic_info: {
      tlabels: [],
      temperatures: [],
      hlabels: [],
      humidities: []
    }
  };

  async getTransactions(id) {
    let response = await api.getTransactionsByFermentation(id);

    if ((await response.status) === 200) {
      const json = await response.json();
      this.setState({ transactions: json.data });
    }
  }

  async getFermentations() {
    this.setState({ loader: true });
    let response = await api.getFermentations();

    if ((await response.status) === 200) {
      this.setState({ loader: false });
      const json = await response.json();
      this.setState({ fermentations: json.data });
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

  handleFermentationClick = async list_id => {
    let fermentation = this.state.fermentations[list_id];

    // Reseting transactions
    this.setState({ transactions: [], qrcode_tag: null });

    // If fermentation already has some information
    if (fermentation.trxs) {
      this.setState({ loader_transactions: true, loader_qrcode: true });
      // Selecting the transactions based on fermentation id
      await this.getTransactions(fermentation.id);

      this.setState({ loader_transactions: false });

      // Generating QrCode based on blockstart and blockend
      const qrcode_string = await api.external_route(fermentation.id);

      // Generating qrcode
      this.createQrcode(qrcode_string);

      this.setState({ loader_qrcode: false });

      // Requesting the measures for the graphics
      const response = await api.getMeasures(fermentation.id);
      if (response.status === 200) {
        const measures = await response.json();
        const graphic_info = this.state.graphic_info;

        graphic_info.tlabels = measures.data.temperatures;
        graphic_info.temperatures = measures.data.temperatures;
        graphic_info.hlabels = measures.data.humidities;
        graphic_info.humidities = measures.data.humidities;

        this.setState({ graphic_info: graphic_info });
      }
    }
  };

  async componentDidMount() {
    //await this.getTransactions();
    await this.getFermentations();

    const { id: fermentation_id } = this.props.match.params;
    const fermentations_size = this.state.fermentations.length;
    if (
      fermentation_id &&
      fermentations_size &&
      fermentation_id < fermentations_size
    ) {
      await this.handleFermentationClick(fermentation_id);
    }
  }

  async componentDidUpdate() {
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
      fermentations,
      graphic_info
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
            lang={lang}
          />
          <QrCode loader={loader_qrcode} loader_msg={loader_qrcode_msg} />
          <Chart
            title="Cocoa Beans Temperature"
            label1="Temperature (ºC)"
            labels={graphic_info.tlabels}
            data1={graphic_info.temperatures}
            position="s12 l6"
            height={50}
          />
          <Chart
            title="Cocoa Beans Humidity"
            label1="Humidity (%)"
            labels={graphic_info.hlabels}
            data1={graphic_info.humidities}
            position="s12 l6"
            height={50}
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
