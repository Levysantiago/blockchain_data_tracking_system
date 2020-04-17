import React, { Component } from "react";
import Loader from "./Loader";

const hide = {
  true: "",
  false: "hide"
};

const types = [
  {
    name: "Iniciar",
    style: {
      textTransform: "capitalize",
      backgroundColor: "#1565c0"
    }
  },
  {
    name: "Parar",
    style: {
      textTransform: "capitalize",
      backgroundColor: "#e53935"
    }
  }
];

class ControlPanel extends Component {
  render() {
    const { type, onClick, loader, loader_msg, activate, data } = this.props;

    const btn_type = types[type];

    return (
      <div className="center">
        <p style={{ fontWeight: "bold" }}>{data.trxs}</p>
        <p>Transações</p>
        <p style={{ fontWeight: "bold" }}>{data.date}</p>
        <p>Aconteceu a última transação</p>
        <p style={{ fontWeight: "bold" }}>{data.start}</p>
        <p>Iniciou esta fermentação</p>
        <p style={{ fontWeight: "bold" }}>Monitorando</p>

        <Loader state={loader} msg={loader_msg} />
        <div className={"center " + hide[activate]} style={{ marginTop: 50 }}>
          <button
            type="button"
            className={"modal-close waves-effect waves-red btn-large"}
            style={btn_type.style}
            onClick={onClick}
          >
            {btn_type.name}
          </button>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
