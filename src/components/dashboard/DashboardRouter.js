import React from "react";
import { Route, Switch } from "react-router-dom";

import * as routes from "../../constants/routes";

import Dashboard from "./Dashboard";
import ProfileView from "./profile/ProfileView";
import Profile from "./profile";

const DashboardRouter = () => (
  <Switch>
    <Route exact path={routes.DASHBOARD} component={Dashboard} />
    <Route path={"/profileView"} component={ProfileView} />
    <Route exact={true} path={routes.PROFILE} component={Profile} />
  </Switch>
);

export default DashboardRouter;
