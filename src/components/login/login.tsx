import * as React from "react";
import {  withRouter } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { RouteComponentProps } from "react-router-dom";

import config from "../../config";
import { IClientId } from "../../interface";
import { Redirect } from "react-router-dom";
// import history from '../../utils/history';

import * as tokenService from "../../services/token";
import * as loginService from "../../services/login";
import * as routes from "../../constants/routes";

const { googleClientId } = config;

interface ILoginState {
  isAuthenticated: boolean;
}

interface ILoginProps extends RouteComponentProps<{ path: string }> {}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: Readonly<ILoginProps>) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  successResponse = (response: any) => {
    const { tokenId: token } = response;
    const tokenData = { token };
    this.saveUserDetails(tokenData);
  };

  saveUserDetails = async (data: IClientId) => {
    try {
      const response = await loginService.getTokens(data);
      if (response) {
        console.log("response", response.data);
        this.setState({ isAuthenticated: true });
        console.log("isAuthenticated from if case", this.state.isAuthenticated);
        tokenService.setLoginDetails(response.data.data);
        this.props.history.push(routes.PROFILE);

        // location.replace(routes.PROFILE);
        // history.push(routes.PROFILE);
      }
    } catch (error) {
      throw error;
    }
  };

  failResponse = (response: any) => {
    console.log("failResponse", response); // TODO: Eror handler
  };

  render() {
    const { isAuthenticated } = this.state;
    // if (this.state.isAuthenticated) {
    //   // location.replace(routes.PROFILE);
    //   this.props.history.push(routes.PROFILE);
    //   // return <Redirect to={routes.DASHBOARD} />;
    // }

    // if (this.state.isAuthenticated) {
    //   return <Redirect to={routes.PROFILE} />;
    // }
    console.log("history.", this.props);
    console.log("isAuthenticated from render", this.state.isAuthenticated);

    return (
      <div>
        {isAuthenticated ? (
          // <Route {...this.props} />
          <Redirect to={routes.PROFILE} />
        ) : (
          <div className="Login container-fluid d-flex align-items-center justify-content-center">
            <link
              href="https://fonts.googleapis.com/css?family=Roboto"
              rel="stylesheet"
              type="text/css"
            />
            <div className="Login__box d-flex align-items-center flex-column">
              <div className="Login__box__mainbox">
                <div className="Social_auth">
                  <GoogleLogin
                    clientId={googleClientId || ""}
                    // buttonText="Login/Sign in with Google"
                    onSuccess={this.successResponse}
                    onFailure={this.failResponse}
                    cookiePolicy={"single_host_origin"}
                  >
                    <span className="Google__btn__icon" />
                    Sign in with Google
                  </GoogleLogin>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(Login);
