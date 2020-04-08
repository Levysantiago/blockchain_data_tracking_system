import React, { Component } from "react";
import Transaction from "./Transaction";

class ListTransactions extends Component {
  render() {
    const scrolled = {
      overflowY: "scroll",
      overflowX: "hidden",
      height: 300,
      padding: 10
    };

    const { title, list } = this.props;
    let i = 0;
    return (
      <div className="col s12">
        <div className="card white small" style={{ height: 350 }}>
          <div className="card-content black-text">
            <span className="card-title">{title}</span>
            <div style={scrolled}>
              {list.map(text => (
                <Transaction key={i++} text={text} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListTransactions;
