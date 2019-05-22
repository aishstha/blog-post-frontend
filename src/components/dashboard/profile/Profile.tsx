import * as React from "react";
import { connect } from "react-redux";
import { Formik, Form, FormikActions } from "formik";

import TextFieldWrapper from "../../inputComponents/TextFieldWrapper";

import { Actions } from "../../../actions/profile";
import { IProfileDetails } from "../../../interface";
import { getUserProfileValidationSchema } from '../../../validation/validationSchema';

import * as tokenService from "../../../services/token";
import * as profileService from "../../../services/profile";

interface IOverviewProps {
  profileDetails: IProfileDetails;
  saveProfile: (profileDetails: IProfileDetails) => void;
}

interface IOverviewState {
  localprofileDetails: IProfileDetails;
  base64Image: string;
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
  handleImage: (e: any) => void;
  base64image: string;
}

class Profile extends React.Component<IOverviewProps, IOverviewState> {
  constructor(props: Readonly<IOverviewProps>) {
    super(props);
    this.state = {
      localprofileDetails: props.profileDetails,
      base64Image: ""
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
      throw error;
    }
  };

  handleSubmit = async (values: any, id: string) => {
    try {
      const profileInfo = {
        image: this.state.base64Image,
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        address: values.address
      };
      await profileService.updateUser(profileInfo, id);
      tokenService.setProfilePicture(this.state.base64Image);
    } catch (error) {
      throw error;
    }
  };

  getBase64 = (files: File, callback: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      callback(reader.result);
    };
    reader.readAsDataURL(files);
  };

  handleImage = (e: any) => {
    const files = e.target.files[0];
    this.getBase64(files, (result: any) => {
      this.setState({
        base64Image: result
      });
    });
  };

  render() {
    const { localprofileDetails } = this.state;
    return (
      <React.Fragment>
        {localprofileDetails && (
          <ProfileForm
            profileInfo={localprofileDetails}
            handleSubmit={this.handleSubmit}
            handleImage={this.handleImage}
            base64image={this.state.base64Image}
          />
        )}
      </React.Fragment>
    );
  }
}

const ProfileForm: React.SFC<IProfileFormProps> = ({
  profileInfo,
  handleSubmit,
  handleImage,
  base64image
}) => (
  <div className="container">
    {profileInfo._id ? (
      <Formik
        initialValues={{
          name: profileInfo.name,
          email: profileInfo.email,
          phoneNumber: profileInfo.phoneNumber,
          address: profileInfo.address,
          image: profileInfo.image
        }}
        validationSchema={getUserProfileValidationSchema}
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
                            src={base64image ? base64image : props.values.image}
                            alt="Advertisement Preview"
                            className="default-image"
                          />
                        </div>
                        <input
                          type="file"
                          id="files"
                          name="files"
                          accept="image/png, image/jpeg"
                          onChange={handleImage}
                          className="form-group__control"
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
                    disabled={true}
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
