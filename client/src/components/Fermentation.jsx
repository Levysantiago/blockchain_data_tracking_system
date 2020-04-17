import React, { Component } from "react";

class Fermentation extends Component {
  parseTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toGMTString();
  }

  render() {
    const line = {
      fontSize: 12
    };

    const { data, id, onClick } = this.props;
    return (
      <a
        href="#"
        id={id}
        onClick={async () => {
          await onClick(id);
        }}
      >
        <div className="card-panel white">
          <div className="black-text">
            <span className="truncate right" style={line}>
              {this.parseTimestamp(data.created_at)}
            </span>
            <span className="truncate" style={line}>
              {"Transactions: " + data.trxs}
            </span>
            <span className="truncate" style={line}>
              {"Blockstart: " + data.blockstart}
            </span>
            <span className="truncate" style={line}>
              {"Blockend: " + data.blockend}
            </span>
          </div>
        </div>
      </a>
    );
  }
}

export default Fermentation;
