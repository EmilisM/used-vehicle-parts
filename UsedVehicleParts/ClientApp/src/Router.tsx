import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Containers/Home";
import NotFound from "./Containers/NotFound";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default Router;
