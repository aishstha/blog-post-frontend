import * as React from "react";
import { Route } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

import config from "../../config";
import { IClientId } from "../../interface";

// import * as tokenService from "../../services/token";
import * as loginService from "../../services/login";
const { googleClientId } = config;

interface ILoginState {
  isAuthenticated: boolean;
}

class Login extends React.Component<{}, ILoginState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  successResponse = (response: any) => {
    const clientId = response.id_client;
    this.saveUserDetails(clientId);
  };

  saveUserDetails = async (data: IClientId) => {
    try {
      const response = await loginService.saveClientId(data);
      const token = response.headers.get("x-auth-token");
      // TODO: Set access token in localstorage
      if (token) {
        this.setState({ isAuthenticated: true });
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
    return (
      <div>
        {isAuthenticated ? (
          <Route {...this.props} />
        ) : (
          <GoogleLogin
            clientId={googleClientId || ""}
            buttonText="Login"
            onSuccess={this.successResponse}
            onFailure={this.failResponse}
            cookiePolicy={"single_host_origin"}
          />
        )}
      </div>
    );
  }
}
export default Login;
