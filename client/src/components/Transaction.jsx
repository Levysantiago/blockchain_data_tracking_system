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

    const { trx } = this.props;
    return (
      <div className="card-panel white">
        <div className="black-text">
          <p className="truncate" style={{ fontSize: 18, fontWeight: "bold" }}>
            {"Input Data: " + trx.input.method + " -> " + trx.input.inputs}
          </p>
          <p className="truncate" style={line}>
            {"Timestamp: " + this.parseTimestamp(trx.timeStamp)}
          </p>
          <p className="truncate" style={line}>
            {"Hash: " + trx.hash}
          </p>
          <p className="truncate" style={line}>
            {"Block nº: " + trx.blockNumber}
          </p>
          <p className="truncate" style={line}>
            {"From: " + trx.from}
          </p>
          <p className="truncate" style={line}>
            {"Fee: " + trx.gasUsed + " Gas"}
          </p>
          <a
            href={"https://rinkeby.etherscan.io/tx/" + trx.hash}
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
