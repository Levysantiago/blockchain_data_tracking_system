import React, { Component } from "react";

const scrolled = {
  overflowY: "scroll",
  overflowX: "hidden",
  height: 300
};

const cardTitleStyle = {
  color: "black",
  fontFamily: "Arvo"
};

const listComponentStyle = {
  margin: 0,
  paddingTop: 10,
  paddingBottom: 10,
  borderBottomStyle: "solid",
  borderWidth: 1,
  borderColor: "#d9d9d9",
  fontFamily: "GlacialIndifferenceRegular"
};

const monthStyle = {
  padding: 0,
  fontSize: 14,
  fontFamily: "Lato",
  color: "black"
};

const dayStyle = {
  padding: 0,
  fontSize: 25,
  fontFamily: "Lato",
  color: "#a6a6a6"
};

const titleStyle = {
  fontSize: 22,
  color: "black"
};

const subtitleStyle = {
  fontSize: 15,
  color: "#a6a6a6"
};

const amountStyle = {
  fontSize: 22,
  color: "black"
};

class ListCard extends Component {
  getListComponent(key, component) {
    let c = component;
    return (
      <div
        key={key}
        className="card-panel white z-depth-0 col s12"
        style={listComponentStyle}
      >
        <div className="col s2">
          <label className="col s12" style={monthStyle}>
            {c.month}
          </label>
          <label className="col s12" style={dayStyle}>
            {c.day}
          </label>
        </div>
        <div className="col s8">
          <label className="col s12" style={titleStyle}>
            {"setHumidity -> 6"}
          </label>
          <label className="col s12" style={subtitleStyle}>
            {c.subtitle}
          </label>
          <label className="col s12" style={subtitleStyle}>
            {c.subtitle}
          </label>
        </div>
        <div className="col s2" style={{ textAlign: "right" }}>
          <label className="col s12" style={amountStyle}>
            {c.amount}
          </label>
          <label className="col s12" style={subtitleStyle}>
            {c.wallet}
          </label>
        </div>
      </div>
    );
  }

  render() {
    const { list } = this.props;
    let i = 0;
    return (
      <div className={"col s12"}>
        <div className="card white horizontal">
          <div className="col s12">
            <div className="card-content col s12">
              <span className="card-title">{"title"}</span>
              <div id="activities">
                {list.map(c => this.getListComponent(i++, c))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListCard;

// comp: [
//     {
//         month: "Wed",
//         day: "03",
//         title: "Title",
//         subtitle: "Subtitle",
//         amount: "3",
//         wallet: "asd"
//     },
//     {
//         month: "Wed",
//         day: "03",
//         title: "Title",
//         subtitle: "Subtitle",
//         amount: "3",
//         wallet: "asd"
//     }
// ]
