import React, { Component } from "react";

const badge_style = color => {
  return {
    backgroundColor: color,
    borderRadius: "4px",
    height: "16px",
    lineHeight: "16px",
    padding: "0px 8px",
    fontSize: "12px",
    fontWeight: "bold"
  };
};

class Fermentation extends Component {
  parseTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toDateString();
  }

  renderBadge(data) {
    if (data && data.active) {
      return (
        <span
          className="new badge"
          data-badge-caption="running"
          style={badge_style("#43a047")}
        ></span>
      );
    } else {
      return (
        <span
          className="new badge"
          data-badge-caption="finished"
          style={badge_style("#757575")}
        ></span>
      );
    }
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
            {this.renderBadge(data)}
            <span className="truncate" style={line}>
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
