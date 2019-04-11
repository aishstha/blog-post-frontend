import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import * as routes from "../../../constants/routes";
import * as tokenService from "../../../services/token";

// import { withAuthState } from "components/hoc/auth";

/**
 * Component to authenticate routes.
 */
class PrivateRoute extends Component {
  render() {
    // const isLoggedIn = tokenService.getUserId();
    // return isLoggedIn ? (
    //   <Route {...this.props} />
    // ) : (
    //   <Redirect to={routes.LOGIN} />
    // );
    return <Route {...this.props} />;
  }
}

export default PrivateRoute;
