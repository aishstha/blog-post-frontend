import * as React from "react";
import { Router as BrowserRouter, Switch, Route } from "react-router-dom";

import history from "../utils/history";

import * as routes from "../constants/routes";

import PrivateRoute from "./common/routes/PrivateRoute";

import Dashboard from "./dashboard";
// import Sample from "./ReduxSample/Sample";
// import DesignKitDashboard from "./designKit/DesignKitDashboard";
import Login from "./login";

// Top level application router.
const Router = () => (
  <BrowserRouter history={history}>
    <Switch>
      <Route exact={true} path={routes.LOGIN} component={Login} />
      {/* <Route exact={true} path={routes.SAMPLE} component={Sample} /> */}
      {/* <Route exact={true} path={"/designKit"} component={DesignKitDashboard} /> */}

      <PrivateRoute path={routes.DASHBOARD} component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default Router;
