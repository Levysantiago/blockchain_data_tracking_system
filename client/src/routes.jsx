import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Analysis from "./pages/Analysis";
const lang = require("./lang/pt");

const Routes = (
  <Router>
    <Route path={lang.menu.home.ROUTE} exact strict component={Home} />
    <Route
      path={lang.menu.transactions.ROUTE}
      exact
      strict
      component={Transactions}
    />
    <Route path={lang.menu.analysis.ROUTE} exact strict component={Analysis} />
  </Router>
);

export default Routes;
