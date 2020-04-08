import React, { Component } from "react";

class Card extends Component {
  render() {
    const { data, imgSrc, title } = this.props;
    return (
      <div className="col s12 m4">
        <div className="card small">
          <div className="card-content black-text">
            <span className="card-title" style={{ marginBottom: 20 }}>
              {title}
            </span>
            <div className="center">
              <img src={imgSrc} alt="icon" />
              <h2 className="card-text">{data}</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
