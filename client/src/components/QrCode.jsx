import React, { Component } from "react";
import Loader from "./Loader";

class QrCode extends Component {
  conditionalHiding() {
    if (this.props.loader) {
      return "hide";
    }
  }

  render() {
    const { loader, loader_msg } = this.props;
    return (
      <div className="col s12 l6">
        <div className="card white small" style={{ height: 400 }}>
          <div className="card-content black-text">
            <span className="card-title">QrCode</span>
            <Loader state={loader} msg={loader_msg} />
            <div id="placeHolder" className="center"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default QrCode;
