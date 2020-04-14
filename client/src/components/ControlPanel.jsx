import React, { Component } from "react";

class ControlPanel extends Component {
  render() {
    return (
      <div className="center">
        <p style={{ fontWeight: "bold" }}>33</p>
        <p>Transações</p>
        <p style={{ fontWeight: "bold" }}>Wed, 08 Apr 2020 18:45:08 GMT</p>
        <p>Aconteceu a última transação</p>
        <p style={{ fontWeight: "bold" }}>Monitorando</p>

        <div className={"center"}>
          <button
            type="button"
            className={"modal-close waves-effect waves-green btn"}
          >
            Parar
          </button>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
