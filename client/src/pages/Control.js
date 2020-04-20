import React, { Component } from "react";
import NavBar from "../components/NavBar";
import Chart from "../components/Chart";
import ControlPanel from "../components/ControlPanel";
import api from "../services/GetDataService";
import setapi from "../services/SetDataService";
const lang = require("../lang/pt");

class Control extends Component {
  state = {
    button_type: 0,
    active: false,
    loader: true,
    activate_button: false,
    loader_msg: "Alterando controle de fermentação",
    panel_info: {
      trxs: 0,
      date: "...",
      start: "..."
    }
  };

  verifyFermentation = async () => {
    this.setState({ loader: true, activate_button: false });
    const response = await api.getFermentation();

    // If fermentation is active
    if (response.status === 200) {
      const json = await response.json();
      console.log(json);
      const res = !!json.active;
      // Updating button type
      this.setState({ active: res });
      if (res) {
        this.setState({ button_type: 1 });
      } else {
        this.setState({ button_type: 0 });
      }

      const info = this.state.panel_info;
      info.start = new Date(json.created_at).toDateString();
      // If this fermentation doesn't have any transaction yet
      if (json.trxs) {
        info.trxs = json.trxs;
        info.date = new Date(json.timestamp * 1000).toDateString();
      }
      this.setState({ panel_info: info });
    }
    this.setState({ loader: false, activate_button: true });
  };

  handleNewFermentation = async () => {
    this.setState({ loader: true, activate_button: false });
    const response = await setapi.setActivateFermentation(!this.state.active);

    if (response.status === 200) {
      if (this.state.active) {
        this.setState({ button_type: 0 });
      } else {
        this.setState({ button_type: 1 });
      }
      this.setState({ active: !this.state.active });
    }
    this.setState({ loader: false, activate_button: true });
  };

  componentDidMount = async () => {
    await this.verifyFermentation();
  };

  render() {
    const {
      button_type,
      activate_button,
      loader,
      loader_msg,
      panel_info
    } = this.state;

    return (
      <div>
        <NavBar lang={lang} />
        <header className="center">
          <h1 className="App-title">{lang.menu.control.ITEM}</h1>
        </header>
        <ControlPanel
          type={button_type}
          onClick={this.handleNewFermentation}
          loader={loader}
          loaderMsg={loader_msg}
          activate={activate_button}
          data={panel_info}
        />
        <div className="container row">
          <Chart
            title="Cocoa Beans Temperature"
            label1="Temperature (ºC)"
            labels={["A", "B", "C"]}
            data1={[3, 5, 9]}
            position="s12 l6"
            height={50}
          />
        </div>
      </div>
    );
  }
}

export default Control;
