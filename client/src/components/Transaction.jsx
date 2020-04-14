import React, { Component } from "react";

class Transaction extends Component {
  parseTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toGMTString();
  }

  render() {
    const line = {
      fontSize: 12
    };

    const { data } = this.props;
    return (
      <div className="card-panel white">
        <div className="black-text">
          <p className="truncate" style={{ fontSize: 18, fontWeight: "bold" }}>
            {"Input Data: " + data.input.method + " -> " + data.input.inputs}
          </p>
          <p className="truncate" style={line}>
            {"Timestamp: " + this.parseTimestamp(data.timeStamp)}
          </p>
          <p className="truncate" style={line}>
            {"Hash: " + data.hash}
          </p>
          <p className="truncate" style={line}>
            {"Block nº: " + data.blockNumber}
          </p>
          <p className="truncate" style={line}>
            {"From: " + data.from}
          </p>
          <p className="truncate" style={line}>
            {"Fee: " + data.gasUsed + " Gas"}
          </p>
          <a
            href={"https://rinkeby.etherscan.io/tx/" + data.hash}
            target="_blank"
            rel="noopener noreferrer"
            className="right"
            style={line}
          >
            See on etherscan
          </a>
        </div>
      </div>
    );
  }
}

export default Transaction;
