import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import ExternalTransactions from "./pages/ExternalTransactions";
import Control from "./pages/Control";
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
    <Route
      path={lang.menu.transactions.ROUTE + "/:blockstart/:blockend"}
      exact
      strict
      component={ExternalTransactions}
    />
    <Route path={lang.menu.control.ROUTE} exact strict component={Control} />
  </Router>
);

export default Routes;
