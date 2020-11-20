import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Layout from "./layout/";
import App from "./pages/app";
import About from "./pages/about";
import Home from "./pages/home";
import Users from "./pages/users/users";

export default () => {
  // let match = useRouteMatch();
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/404">
            <About />
          </Route>
          <Route path="/users">
            <Home />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};
