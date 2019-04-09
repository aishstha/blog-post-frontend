import * as React from "react";
import { Link } from "react-router-dom";

import { logoWhite } from "../../../assests/images";

import { CSSTransition } from "react-transition-group";

import { connect } from "react-redux";
import { Actions } from "../../../actions";

import * as routes from "../../../constants/routes";

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

            <div className="Header__row__brand">
              <img src={logoWhite} alt="Logo of uvertz" />
            </div>
            <div className="Header__menu right">
              <ul className="Nav NavRight">
                <li className="NavRight__user-profile dropdown">
                  <div className="Nav-link" onClick={this.onClickButton}>
                    <span className="profile-img" />
                    <span className="profile-name" />{" "}
                    <span className="arrow">
                      <i className="material-icons">arrow_drop_down</i>
                    </span>
                  </div>
                  <Menu status={this.state.localIsMenuOpen} />
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
          <Link to={routes.PROFILE} className="Dropdown-menu__item">
            View Profile
          </Link>
          <li className="Dropdown-menu__item">Log Out</li>
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
