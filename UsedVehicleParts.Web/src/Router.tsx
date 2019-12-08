import React, { useContext } from "react";
import {
  Switch,
  Route,
  Redirect,
  RouteComponentProps,
  RouteProps
} from "react-router-dom";

import Home from "./Containers/home";
import Login from "./Containers/login";
import NotFound from "./Containers/notFound";
import NewPart from "./Containers/newPart";
import Profile from "./Containers/profile";

import routes from "./Constants/routes";
import { AppStateContext } from "./App";

interface PrivateRouteProps extends RouteProps {
  component:
    | React.StatelessComponent<RouteComponentProps<{}>>
    | React.ComponentClass<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const state = useContext(AppStateContext);

  return (
    <Route
      {...rest}
      render={props =>
        state.isAuthorized ? (
          <Component {...props} />
        ) : (
          <Redirect to={routes.login} />
        )
      }
    />
  );
};

const Router = () => (
  <Switch>
    <Route exact path={routes.home} component={Home} />
    <Route exact path={routes.login} component={Login} />
    <PrivateRoute exact path={routes.profile} component={Profile} />
    <PrivateRoute exact path={routes.newPart} component={NewPart} />
    <Route component={NotFound} />
  </Switch>
);

export default Router;
