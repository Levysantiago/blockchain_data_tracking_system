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

    const { data } = this.props;
    return (
      <div className="card-panel white">
        <div className="black-text">
          <span className="truncate right" style={line}>
            {"Date: Wed, 08 Apr 2020 18:45:08 GMT"}
          </span>
          <span className="truncate" style={line}>
            {"Transactions: 33"}
          </span>
          <span className="truncate" style={line}>
            {"Blockstart: 123"}
          </span>
          <span className="truncate" style={line}>
            {"Blockend: 321"}
          </span>
        </div>
      </div>
    );
  }
}

export default Fermentation;
