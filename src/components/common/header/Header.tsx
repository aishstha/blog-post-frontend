import * as React from "react";

import { logoWhite } from "../../../assests/images";

import { CSSTransition } from "react-transition-group";

import { connect } from "react-redux";
import { Actions } from "../../../actions";

interface IAppProps {
  isMenuOpen: boolean;
  toggleMenu: (isMenuOpen: boolean) => void;
}

interface IAppState {
  localIsMenuOpen: boolean;
}

interface IMenuProps {
  status: boolean;
}

class Header extends React.Component<IAppProps, IAppState> {
  constructor(props: Readonly<IAppProps>) {
    super(props);
    this.state = {
      localIsMenuOpen: props.isMenuOpen
    };
  }

  componentDidUpdate(prevProps: IAppProps) {
    if (prevProps !== this.props) {
      this.setState({
        localIsMenuOpen: this.props.isMenuOpen
      });
    }
  }

  onClickButton = () => {
    this.props.toggleMenu(this.state.localIsMenuOpen);
  };

  render() {
    return (
      <div className="Header">
        <div className="container">
          <div className="Header__row">
            <div className="Sp-menu">
              {/* <a onClick={this.toggleHeader}> */}
              <a>
                <i className="material-icons">menu</i>
              </a>
            </div>

            <div
              className="Header__row__brand"
              // onClick={() => this.handleLogoClick()}
            >
              <img src={logoWhite} alt="Logo of uvertz" />
            </div>
            <div className="Header__menu right">
              <ul className="Nav NavRight">
                <li className="NavRight__user-profile dropdown">
                  <div className="Nav-link" onClick={this.onClickButton}>
                    {/* <div className="Nav-link"> */}
                    <span className="profile-img">
                      {/* {getUserNameInitials(user && user.user.fullName)} */}
                    </span>
                    <span className="profile-name">
                      {/* {uppercaseFirstLetter(user && user.user.fullName)} */}
                    </span>{" "}
                    <span className="arrow">
                      <i className="material-icons">arrow_drop_down</i>
                    </span>
                  </div>
                  <Menu status={this.state.localIsMenuOpen} />
                  {/* {
                    <Profile
                      isPopUpOpen={this.state.isPopUpOpen}
                      togglePopUp={this.toggleProfilePopup}
                      // context={context}
                    />
                  } */}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Menu: React.SFC<IMenuProps> = ({ status }) => {
  const menuClass = status ? "Dropdown-menu show" : "Dropdown-menu";

  return (
    <CSSTransition
      in={status}
      timeout={300}
      classNames="popup"
      unmountOnExit={true}
    >
      <div className={menuClass}>
        <ul>
          <li className="Dropdown-menu__item">
            {/* <a className="Nav-link" onClick={() => togglePopUp(context)}> */}
            View Profile
            {/* </a> */}
          </li>
          <li className="Dropdown-menu__item">
            {/* <a className="Nav-link" onClick={() => handleLogout()}> */}
            Log Out
            {/* </a> */}
          </li>
        </ul>
      </div>
    </CSSTransition>
  );
};

const mapStateToProps = ({ menuReducer }: any) => {
  return { isMenuOpen: menuReducer.isMenuOpen };
};

const mapDispatchToProps = (dispatch: any) => ({
  toggleMenu: (showMenu: any) => dispatch(Actions.toggleMenu(showMenu)) //TODO: Changeany
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
