import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Containers/home";
import NotFound from "./Containers/notFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Router;
