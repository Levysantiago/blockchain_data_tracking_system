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
    const { title, transactions, loader, loaderMsg, height } = this.props;

    const scrolled = {
      overflowY: "scroll",
      overflowX: "hidden",
      height: height - 100,
      padding: 10
    };

    let i = 0;
    return (
      <div className="col s12">
        <div className="card white small" style={{ height: height }}>
          <div className="card-content black-text">
            <span className="card-title">{title}</span>
            <Loader state={loader} msg={loaderMsg} />
            <div className={this.conditionalHiding()} style={scrolled}>
              {transactions.map(transaction => (
                <Transaction key={i++} data={transaction} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListTransactions;
