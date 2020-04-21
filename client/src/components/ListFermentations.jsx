import React, { Component } from "react";
import Loader from "./Loader";
import Fermentation from "./Fermentation";

class ListFermentations extends Component {
  conditionalHiding() {
    if (this.props.loader) {
      return "hide";
    }
  }

  render() {
    const {
      title,
      list,
      loader,
      loaderMsg,
      height,
      onClick,
      lang
    } = this.props;

    const scrolled = {
      overflowY: "scroll",
      overflowX: "hidden",
      height: height - 100,
      padding: 10
    };

    let i = 0;
    return (
      <div className="col s12 l6">
        <div className="card white small" style={{ height: height }}>
          <div className="card-content black-text">
            <span className="card-title">{title}</span>
            <Loader state={loader} msg={loaderMsg} />
            <div className={this.conditionalHiding()} style={scrolled}>
              {list.map(fermentation => (
                <Fermentation
                  key={i}
                  data={fermentation}
                  id={i++}
                  onClick={onClick}
                  lang={lang}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListFermentations;
