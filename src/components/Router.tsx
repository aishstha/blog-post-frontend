import * as React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import * as routes from "../constants/routes";

import Login from "./login";
import Dashboard from "./dashboard";
import PrivateRoute from "./common/routes/PrivateRoute";
import DesignKitDashboard from "./designKit/DesignKitDashboard";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path={routes.LOGIN} component={Login} />
      <PrivateRoute path={routes.DASHBOARD} component={Dashboard} />
      
      <Route exact={true} path={routes.DESIGN_KIT} component={DesignKitDashboard} />
    </Switch>
  </BrowserRouter>
);

export default Router;
