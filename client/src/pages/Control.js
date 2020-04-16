import React, { Component } from "react";
import NavBar from "../components/NavBar";
import Chart from "../components/Chart";
import ControlPanel from "../components/ControlPanel";
const lang = require("../lang/pt");

class Control extends Component {
  state = {};
  render() {
    return (
      <div>
        <NavBar lang={lang} />
        <div className="container row">
          <header className="center">
            <h1 className="App-title">{lang.menu.analysis.ITEM}</h1>
          </header>
          <ControlPanel />
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
