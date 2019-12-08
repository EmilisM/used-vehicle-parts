import * as React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./Containers/home";
import Login from "./Containers/login";
import NotFound from "./Containers/notFound";
import NewPart from "./Containers/newPart";
import Profile from "./Containers/profile";

import routes from "./Constants/routes";

const Router = () => (
  <Switch>
    <Route exact path={routes.home} component={Home} />
    <Route exact path={routes.login} component={Login} />
    <Route exact path={routes.profile} component={Profile} />
    <Route exact path={routes.newPart} component={NewPart} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
