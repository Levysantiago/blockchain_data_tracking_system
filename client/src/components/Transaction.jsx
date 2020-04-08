import React, { Component } from "react";

class Transaction extends Component {
  render() {
    const line = {
      fontSize: 12
    };
    return (
      <div className="card-panel white">
        <div className="black-text">
          <p className="truncate" style={line}>
            Hash:
            0xdbd94b00ca1758c1a86d9ff4b62e43a88da4756d2633e6ecfb46b43f747749f3
          </p>
          <p className="truncate" style={line}>
            Block: 6246625
          </p>
          <p className="truncate" style={line}>
            From: 0xe64245312b9fgd8d8dad5e8073ega2dead9aag
          </p>
          <p className="truncate" style={line}>
            Fee: 0.000769616 Ether
          </p>
          <p className="truncate" style={line}>
            Input Data: [alguma coisa]
          </p>
          <a
            href="https://rinkeby.etherscan.io/"
            target="_blank"
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
