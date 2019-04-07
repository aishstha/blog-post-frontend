import React from "react";
import { Route, Switch } from "react-router-dom";

import * as routes from "../../constants/routes";

import Dashboard from "./Dashboard";

const DashboardRouter = () => (
  <Switch>
    <Route exact path={routes.DASHBOARD} component={Dashboard} />
    {/* <Route path={routes.POSTS} component={Posts} /> */}
  </Switch>
);

export default DashboardRouter;
