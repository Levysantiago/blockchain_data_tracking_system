import React, { Component } from "react";
import NavBar from "../components/NavBar";
import Chart from "../components/Chart";
import ControlPanel from "../components/ControlPanel";
import api from "../services/GetDataService";
import setapi from "../services/SetDataService";
const lang = require("../lang/pt");

class Control extends Component {
  state = {
    control_button_name: "Iniciar",
    active: false,
    loader: true,
    activate_button: false,
    loader_msg: "Alterando controle de fermentação"
  };

  verifyFermentation = async () => {
    this.setState({ loader: true, activate_button: false });
    const response = await api.getFermentation();
    console.log(response);
    if (response.status === 200) {
      const json = await response.json();
      const res = !!json.active;
      this.setState({ active: res });
      if (res) {
        this.setState({ control_button_name: "Parar" });
      } else {
        this.setState({ control_button_name: "Iniciar" });
      }
    }
    this.setState({ loader: false, activate_button: true });
    console.log(this.state.activate_button);
  };

  handleNewFermentation = async () => {
    this.setState({ loader: true, activate_button: false });
    const response = await setapi.setActivateFermentation(!this.state.active);

    if (response.status === 200) {
      if (this.state.active) {
        this.setState({ control_button_name: "Iniciar" });
      } else {
        this.setState({ control_button_name: "Parar" });
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
      control_button_name,
      activate_button,
      loader,
      loader_msg
    } = this.state;

    console.log(activate_button);

    return (
      <div>
        <NavBar lang={lang} />
        <div className="container row">
          <header className="center">
            <h1 className="App-title">{lang.menu.control.ITEM}</h1>
          </header>
          <ControlPanel
            button_name={control_button_name}
            onClick={this.handleNewFermentation}
            loader={loader}
            loaderMsg={loader_msg}
            activate_button={activate_button}
          />
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
