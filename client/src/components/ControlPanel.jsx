import React, { Component } from "react";
import Loader from "./Loader";

const hide = {
  true: "",
  false: "hide"
};

const warning_message_style = {
  color: "#ff9e80",
  fontWeight: "bold"
};

const fermentation_link_style = {
  textDecoration: "underline",
  color: "#90caf9"
};

const divider_style = {
  border: "0.2px solid #1e88e5",
  marginTop: "20px"
};

const box_style = {
  border: "2px solid #e0e0e0",
  borderRadius: "40px",
  backgroundColor: "#1e88e5"
};

const topic_style = {
  fontSize: 30,
  fontWeight: "bold",
  padding: "5px",
  marginBottom: "5px"
};

const value_style = {
  ...box_style,
  ...topic_style
};

const value_identifier_style = {
  fontSize: 14
};

// Button types
const button_types = [
  {
    name: "Iniciar",
    style: {
      textTransform: "capitalize",
      backgroundColor: "#4eae27",
      marginBottom: "20px"
    }
  },
  {
    name: "Parar",
    style: {
      textTransform: "capitalize",
      backgroundColor: "#e53935",
      marginBottom: "20px"
    }
  }
];

const message_types = ["Monitoramento encerrado", "Monitorando"];

class ControlPanel extends Component {
  render() {
    const {
      type,
      onClick,
      loader,
      loader_msg,
      activate,
      data,
      lang
    } = this.props;

    const btn_type = button_types[type];
    const message = message_types[type];

    return (
      <div className="center blue darken-3" style={{ padding: "10px" }}>
        <div className="container row white-text">
          {/* Amount of transactions */}
          <p className="col s10 l6 offset-s1 offset-l3" style={value_style}>
            {data.trxs}
          </p>
          <p className="col s12" style={value_identifier_style}>
            Transações
          </p>

          {/* Date */}
          <p className="col s10 l6 offset-s1 offset-l3" style={value_style}>
            {data.date}
          </p>
          <p className="col s12" style={value_identifier_style}>
            Aconteceu a última transação
          </p>

          {/* Start date */}
          <p className="col s10 l6 offset-s1 offset-l3" style={value_style}>
            {data.start}
          </p>
          <p className="col s12" style={value_identifier_style}>
            Iniciou esta fermentação
          </p>

          {/* Warning message */}
          <p className="col s12" style={warning_message_style}>
            {data.warning}
          </p>

          {/* Divider */}
          <div className="col s12" style={divider_style} />

          {/* Current message */}
          <p className="col s12" style={topic_style}>
            {message}
          </p>

          <Loader state={loader} msg={loader_msg} />
          <div className={"center col s12 " + hide[activate]}>
            <button
              type="button"
              className={"modal-close waves-effect waves-red btn-large"}
              style={btn_type.style}
              onClick={onClick}
            >
              {btn_type.name}
            </button>

            <div className="col s12">
              <a
                id="blue_link"
                className="right"
                style={fermentation_link_style}
                href={lang.menu.transactions.ROUTE + "/" + data.id}
              >
                Veja mais informações desta fermentação
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
