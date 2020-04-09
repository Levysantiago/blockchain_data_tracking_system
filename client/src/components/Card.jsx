import React, { Component } from "react";
import Loader from "./Loader";

class Card extends Component {
  conditionalHiding() {
    if (this.props.loader) {
      return "hide";
    }
  }

  render() {
    const { data, imgSrc, title, loader, loaderMsg } = this.props;
    return (
      <div className="col s12 m4">
        <div className="card small">
          <div className="card-content black-text">
            <span className="card-title" style={{ marginBottom: 20 }}>
              {title}
            </span>
            <div className="center">
              <img src={imgSrc} alt="icon" />
              <h2 className={"card-text " + this.conditionalHiding()}>
                {data}
              </h2>
              <Loader state={loader} msg={loaderMsg} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
