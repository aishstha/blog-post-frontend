import * as React from "react";
import { GoogleLogin } from "react-google-login";
import { RouteComponentProps } from "react-router-dom";

import config from "../../config";
import { IClientId } from "../../interface";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Actions } from "../../actions";

import * as routes from "../../constants/routes";
import * as tokenService from "../../services/token";
import * as loginService from "../../services/login";

const { googleClientId } = config;

interface ILoginState {
  isAuthenticated: boolean;
}

interface ILoginProps {
  isAuthenticated: boolean;
  checkUserAuthentication: (isAuthenticated: boolean) => void;
}

interface ILoginProps extends RouteComponentProps<{ path: string }> {}

class Login extends React.Component<ILoginProps, ILoginState> {
  constructor(props: Readonly<ILoginProps>) {
    super(props);
    this.state = {
      isAuthenticated: props.isAuthenticated
    };
  }

  componentDidUpdate(prevProps: ILoginProps) {
    if (prevProps !== this.props) {
      this.setState({
        isAuthenticated: this.props.isAuthenticated
      });
    }
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
        const result = tokenService.setLoginDetails(response.data.data);
        if (result) {
          this.props.checkUserAuthentication(true);
        }
      }
    } catch (error) {
      throw error;
    }
  };

  failResponse = (response: any) => {
    console.log("Fail response", response);
  };

  render() {
    const { isAuthenticated } = this.state;

    return (
      <div>
        {isAuthenticated ? (
          <Redirect to={routes.DASHBOARD} />
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
                    onSuccess={this.successResponse}
                    onFailure={this.failResponse}
                    cookiePolicy={"single_host_origin"}
                  >
                    <span className="Google__btn__icon" />
                    Login/Sign up with Google
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

const mapStateToProps = ({ loginReducer }: any) => {
  return { isAuthenticated: loginReducer.isAuthenticated };
};

const mapDispatchToProps = (dispatch: any) => ({
  checkUserAuthentication: (isAuthenticated: any) =>
    dispatch(Actions.checkUserAuthentication(isAuthenticated))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
