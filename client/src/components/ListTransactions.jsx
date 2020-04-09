import React, { Component } from "react";
import Transaction from "./Transaction";
import Loader from "./Loader";

class ListTransactions extends Component {
  conditionalHiding() {
    if (this.props.loader) {
      return "hide";
    }
  }

  render() {
    const scrolled = {
      overflowY: "scroll",
      overflowX: "hidden",
      height: 300,
      padding: 10
    };

    const { title, transactions, loader, loaderMsg } = this.props;
    let i = 0;
    return (
      <div className="col s12">
        <div className="card white small" style={{ height: 400 }}>
          <div className="card-content black-text">
            <span className="card-title">{title}</span>
            <Loader state={loader} msg={loaderMsg} />
            <div className={this.conditionalHiding()} style={scrolled}>
              {transactions.map(transaction => (
                <Transaction key={i++} trx={transaction} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListTransactions;
