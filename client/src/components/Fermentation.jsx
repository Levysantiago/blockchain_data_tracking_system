import React, { Component } from "react";

const dateStyle = {
  fontSize: 12,
  color: "#757575",
  marginBottom: "15px"
};

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

    const { data, id, onClick, lang } = this.props;
    return (
      <a
        href={lang.menu.transactions.ROUTE + "/" + id}
        id={id}
        onClick={async () => {
          await onClick(id);
        }}
      >
        <div className="card-panel white">
          <div className="black-text">
            {this.renderBadge(data)}
            <p className="truncate" style={dateStyle}>
              {this.parseTimestamp(data.created_at)}
            </p>
            <p className="truncate" style={line}>
              <b>{"Transactions: "}</b> {data.trxs}
            </p>
            <p className="truncate" style={line}>
              <b>{"Blocks: "}</b> {data.blockstart + " - " + data.blockend}
            </p>
          </div>
        </div>
      </a>
    );
  }
}

export default Fermentation;
