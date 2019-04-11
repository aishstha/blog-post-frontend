import * as React from "react";
import { connect } from "react-redux";
import { Formik, Form, FormikActions, Field } from "formik";
// import base64Img from "base64-img";

import Spinner from "../../common/Spinner";
import TextFieldWrapper from "../../inputComponents/TextFieldWrapper";

import { notify } from "../../../utils/notification";
import { Actions } from "../../../actions/profile";
import { IProfileDetails } from "../../../interface";
// import { getUserProfileValidationSchema } from "../../../validation/validationSchema";
import { messageStatus } from "../../../constants/messageStatus";
import { defaultMessage } from "../../../constants/applicationMessage";

import * as tokenService from "../../../services/token";
import * as profileService from "../../../services/profile";
import { coke } from "../../../assests/images";

interface IOverviewProps {
  profileDetails: IProfileDetails;
  saveProfile: (profileDetails: IProfileDetails) => void;
}

interface IOverviewState {
  localprofileDetails: IProfileDetails;
  isLoading: boolean;
}

interface IValues {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  image: string;
}

interface IProfileFormProps {
  profileInfo: IProfileDetails;
  handleSubmit: (value: IValues, id: string) => void;
}

class Profile extends React.Component<IOverviewProps, IOverviewState> {
  constructor(props: Readonly<IOverviewProps>) {
    super(props);
    this.state = {
      localprofileDetails: props.profileDetails,
      isLoading: false
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
      const userId = tokenService.getUserId();

      const profileResponse = await profileService.getUserById(userId);
      this.props.saveProfile(profileResponse.data);
    } catch (error) {
      throw error; // TODO: Error handeling
    }
  };

  handleSubmit = async (values: any, id: string) => {
    this.setState({
      isLoading: true
    });
    try {
      console.log("values", values);
      const imagePath = values.image;
      // const image = base64Img.base64Sync(imagePath);
      console.log("image", imagePath);
      await profileService.updateUser(values, id);
      this.setState({
        isLoading: false
      });
      notify(messageStatus.SUCCESS, "Successfully updated");
    } catch (error) {
      this.setState({
        isLoading: false
      });
      notify(messageStatus.ERROR, defaultMessage.INVALID_OLD_PASSWORD);
    }
  };

  render() {
    const { localprofileDetails, isLoading } = this.state;
    console.log("localprofileDetails", localprofileDetails);
    if (isLoading) {
      return <Spinner />;
    }

    return (
      <React.Fragment>
        {localprofileDetails && (
          <ProfileForm
            profileInfo={localprofileDetails}
            handleSubmit={this.handleSubmit}
          />
        )}
      </React.Fragment>
    );
  }
}

const ProfileForm: React.SFC<IProfileFormProps> = ({
  profileInfo,
  handleSubmit
}) => (
  <div className="container">
    {profileInfo._id ? (
      <Formik
        initialValues={{
          name: profileInfo.name,
          email: profileInfo.email,
          phoneNumber: profileInfo.phoneNumber,
          address: profileInfo.address,
          image: ""
        }}
        // validationSchema={getUserProfileValidationSchema}
        onSubmit={async (
          values: IValues,
          { setSubmitting }: FormikActions<IValues>
        ) => {
          handleSubmit(values, profileInfo._id);
        }}
        render={props => (
          <div className="container">
            <div className="form-section">
              <Form>
                <div className="form-group">
                  <div className="col">
                    <div className="File">
                      <div className="File__upload flex-column d-flex justify-content-center align-items-center">
                        <div className="upload-image">
                          <img
                            src={coke}
                            alt="Advertisement Preview"
                            className="default-image"
                          />
                          <span
                            className="delete-image"
                            // onClick={this.onDeleteIconClicked}
                          >
                            <i className="material-icons">delete</i>
                          </span>
                          {/* <span className="default-text">Drag photos here</span> */}
                        </div>
                        <Field
                          className="form-group__control"
                          name="image"
                          type="file"
                          id="image"
                          accept="image/*"
                          value={props.values.image || ""}
                          label="Image Upload"
                          placeholder="Image upload"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <TextFieldWrapper
                    inputTypeClassName="form-group__control"
                    name="name"
                    type="text"
                    id="name"
                    value={props.values.name || ""}
                    label="Name"
                    placeholder="Name"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                  />
                  {props.errors.name && (
                    <div className="form-group__error">{props.errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <TextFieldWrapper
                    inputTypeClassName="form-group__control"
                    name="email"
                    type="text"
                    id="email"
                    value={props.values.email || ""}
                    label="Email"
                    placeholder="Email"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                  />
                  {props.errors.email && (
                    <div className="form-group__error">
                      {props.errors.email}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <TextFieldWrapper
                    inputTypeClassName="form-group__control"
                    name="phoneNumber"
                    type="text"
                    id="phoneNumber"
                    value={props.values.phoneNumber || ""}
                    label="Phone Number"
                    placeholder="Phone Number"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                  />
                  {props.errors.phoneNumber && (
                    <div className="form-group__error">
                      {props.errors.phoneNumber}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <TextFieldWrapper
                    inputTypeClassName="form-group__control"
                    name="address"
                    type="text"
                    id="address"
                    value={props.values.address || ""}
                    label="Address"
                    placeholder="Address"
                    handleChange={props.handleChange}
                    handleBlur={props.handleBlur}
                  />
                  {props.errors.address && (
                    <div className="form-group__error">
                      {props.errors.address}
                    </div>
                  )}
                </div>
                <button type="submit" className="btn btn--blue btn--lg">
                  Submit
                </button>
              </Form>
            </div>
          </div>
        )}
      />
    ) : (
      <h2>User id not found</h2>
    )}
  </div>
);

const mapStateToProps = ({ profileReducer }: any) => {
  console.log("profileReducer", profileReducer);
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
