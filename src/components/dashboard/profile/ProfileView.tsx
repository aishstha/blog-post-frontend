import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import * as routes from "../../../constants/routes";
import * as profileService from "../../../services/profile";

import { IProfileDetails } from "src/interface";
import { Actions } from "../../../actions/profile";

interface IOverviewProps {
  profileDetails: Array<IProfileDetails>;
  saveProfile: (profileDetails: IProfileDetails) => void;
}

interface IOverviewState {
  localprofileDetails: Array<IProfileDetails>;
}

class Profile extends React.Component<IOverviewProps, IOverviewState> {
  constructor(props: Readonly<IOverviewProps>) {
    super(props);
    this.state = {
      localprofileDetails: props.profileDetails
    };
  }

  componentDidMount() {
    this.fetchProfileInformation();
  }

  componentDidUpdate(prevProps: IOverviewProps) {
    if (prevProps !== this.props) {
      this.setState({
        localprofileDetails: this.props.profileDetails
      });
    }
  }

  fetchProfileInformation = async () => {
    try {
      const id = "5caa172dbaa74c1b611a96d3";
      const profileResponse = await profileService.getUserById(id);
      this.props.saveProfile(profileResponse.data);
    } catch (error) {
      throw error; // TODO: Error handeling
    }
  };

  render() {
    const { localprofileDetails } = this.state;
    return (
      <div className="page">
        <div className="container">
          <ProfileView {...localprofileDetails} />
        </div>
      </div>
    );
  }
}

const ProfileView = (profileInfo: any) => {
  return (
    <div className="container">
      <div className="form-section">
        <div className="form-group">
          <label className="form-group__label form-group__label--block">
            Full Name
          </label>
          <input
            name="fullName"
            type="text"
            className={`form-group__control`}
            value={profileInfo.name}
            disabled={true}
          />
        </div>
        <div className="form-group">
          <label className="form-group__label form-group__label--block">
            Phone Number
          </label>
          <input
            name="phoneNumber"
            type="text"
            className={`form-group__control`}
            value={profileInfo.phoneNumber}
            disabled={true}
          />
        </div>
        <div className="form-group">
          <label className="form-group__label form-group__label--block">
            Email
          </label>
          <input
            name="email"
            type="text"
            className={`form-group__control`}
            value={profileInfo.email}
            disabled={true}
          />
        </div>
        <div className="form-group">
          <label className="form-group__label form-group__label--block">
            Address
          </label>
          <input
            name="phoneNumber"
            type="text"
            className={`form-group__control`}
            value={profileInfo.address}
            disabled={true}
          />
        </div>
      </div>
      <Link to={routes.EDIT_PROFILE} className="btn btn--blue btn--lg">
        Edit Profile
      </Link>{" "}
    </div>
  );
};

const mapStateToProps = ({ profileReducer }: any) => {
  return { profileDetails: profileReducer.profileDetails };
};

const mapDispatchToProps = (dispatch: any) => ({
  saveProfile: (profileDetails: IProfileDetails) =>
    dispatch(Actions.storeProfile(profileDetails))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
