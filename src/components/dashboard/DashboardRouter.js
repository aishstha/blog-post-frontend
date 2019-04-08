import React from "react";
import { Route, Switch } from "react-router-dom";

import * as routes from "../../constants/routes";

import Dashboard from "./Dashboard";
import Profile from "./profile";
import EditProfile from "./profile/EditProfile";

const DashboardRouter = () => (
  <Switch>
    <Route exact path={routes.DASHBOARD} component={Dashboard} />
    <Route path={routes.PROFILE} component={Profile} />
    <Route exact={true} path={routes.EDIT_PROFILE} component={EditProfile} />
  </Switch>
);

export default DashboardRouter;
