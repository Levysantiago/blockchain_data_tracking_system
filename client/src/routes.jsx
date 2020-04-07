import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./pages/App";

const Routes = (
  <Router>
    <Route path="/" exact strict component={App} />
  </Router>
);

export default Routes;
