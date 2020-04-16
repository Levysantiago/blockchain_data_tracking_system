import React, { Component } from "react";
import Loader from "./Loader";

class ControlPanel extends Component {
  render() {
    const {
      button_name,
      onClick,
      loader,
      loader_msg,
      activate_button
    } = this.props;

    const hide = {
      true: "",
      false: "hide"
    };

    return (
      <div className="center">
        <p style={{ fontWeight: "bold" }}>33</p>
        <p>Transações</p>
        <p style={{ fontWeight: "bold" }}>Wed, 08 Apr 2020 18:45:08 GMT</p>
        <p>Aconteceu a última transação</p>
        <p style={{ fontWeight: "bold" }}>Monitorando</p>

        <Loader state={loader} msg={loader_msg} />
        <div
          className={"center " + hide[activate_button]}
          style={{ marginTop: 50 }}
        >
          <button
            type="button"
            className={"modal-close waves-effect waves-green btn"}
            onClick={onClick}
          >
            {button_name}
          </button>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
