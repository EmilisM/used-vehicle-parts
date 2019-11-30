import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Containers/Home";
import NotFound from "./Containers/NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
