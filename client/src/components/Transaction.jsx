import React, { Component } from "react";

const dateStyle = {
  fontSize: 12,
  color: "#757575",
  marginBottom: "15px"
};

const content_text = {
  fontSize: 14
};

const logs_name_syle = {
  ...content_text,
  fontWeight: "bold"
};

const reveal_text_style = {
  ...content_text,
  marginBottom: "5px"
};

class Transaction extends Component {
  parseTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toDateString();
  }

  renderLogs(data) {
    if (data.logs.length) {
      const logs = data.logs[0];
      const argskeys = Object.keys(logs.args);
      return (
        <div className="row" style={{ marginLeft: "2px" }}>
          <i className="material-icons deep-orange-text text-darken-1 left">
            warning
          </i>
          <p className="truncate" style={logs_name_syle}>
            {logs.name}
          </p>
          <p className="truncate" style={content_text}>
            {argskeys[0] +
              " = " +
              logs.args[argskeys[0]] +
              " (limit is " +
              logs.args[argskeys[1]] +
              ")"}
          </p>
        </div>
      );
    }
  }

  render() {
    let { data } = this.props;

    return (
      <div className="card white sticky-action">
        {/* CONTENT */}
        <div className="card-content black-text">
          <span
            className="card-title activator grey-text text-darken-4 truncate"
            style={{ fontSize: 20 }}
          >
            {data.input.method + " -> " + data.input.inputs}
            <i className="material-icons right">more_vert</i>
          </span>
          <p className="truncate" style={dateStyle}>
            {"Date: " + this.parseTimestamp(data.timeStamp)}
          </p>
          {this.renderLogs(data)}
          <div className="row">
            <i
              className="material-icons left indigo-text text-lighten-1"
              style={{ marginLeft: "13px", marginRight: "15px" }}
            >
              local_gas_station
            </i>
            <p style={content_text}>{"Fee: " + data.gasUsed + " Gas"}</p>
          </div>
          <a
            href={"https://rinkeby.etherscan.io/tx/" + data.hash}
            target="_blank"
            rel="noopener noreferrer"
            className="right"
            style={content_text}
          >
            See on etherscan
          </a>
        </div>

        {/* REVEAL */}
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">
            Extra information<i className="material-icons right">close</i>
          </span>
          <div style={{ paddingLeft: "13px" }}>
            <p className="truncate " style={reveal_text_style}>
              <b>{"Block nº: "}</b>
              {data.blockNumber}
            </p>
            <p className="truncate " style={reveal_text_style}>
              <b>{"TrxHash: "}</b>
              {data.hash}
            </p>
            <p className="truncate" style={reveal_text_style}>
              <b>{"From: "}</b> {data.from}
            </p>
            <p className="truncate" style={reveal_text_style}>
              <b>{"To: "}</b>
              {data.to}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Transaction;
