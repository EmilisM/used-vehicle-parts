import * as React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Containers/home";
import NotFound from "./Containers/notFound";

import routes from "./Constants/routes";

const Router = () => (
  <Switch>
    <Route exact path={routes.home} component={Home} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
