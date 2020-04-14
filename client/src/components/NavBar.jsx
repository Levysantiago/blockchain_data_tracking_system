import React, { Component } from "react";

class NavBar extends Component {
  componentDidMount() {
    var elem = document.querySelector(".sidenav");
    window.M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });
  }

  blackLinkStyle(yes) {
    if (yes) {
      return { color: "#424242" };
    } else {
      return { color: "#e0e0e0" };
    }
  }

  getMenuIcon(blackStyle) {
    if (blackStyle) {
      return "menu.png";
    }
    return "menu-white.png";
  }

  render() {
    const { lang } = this.props;
    return (
      <div>
        <nav id="main-nav">
          <div className="nav-wrapper white">
            <a href="/#" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons black-text">menu</i>
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a className="black-text" href={lang.menu.home.ROUTE}>
                  {lang.menu.home.ITEM}
                </a>
              </li>
              <li>
                <a className="black-text" href={lang.menu.analysis.ROUTE}>
                  {lang.menu.analysis.ITEM}
                </a>
              </li>
              <li>
                <a className="black-text" href={lang.menu.transactions.ROUTE}>
                  {lang.menu.transactions.ITEM}
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <ul className="sidenav" id="mobile-demo">
          <li>
            <a className="black-text" href={lang.menu.home.ROUTE}>
              {lang.menu.home.ITEM}
            </a>
          </li>
          <li>
            <a className="black-text" href={lang.menu.analysis.ROUTE}>
              {lang.menu.analysis.ITEM}
            </a>
          </li>
          <li>
            <a className="black-text" href={lang.menu.transactions.ROUTE}>
              {lang.menu.transactions.ITEM}
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default NavBar;
