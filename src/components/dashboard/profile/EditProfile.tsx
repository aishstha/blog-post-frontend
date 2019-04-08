import * as React from "react";
import { connect } from "react-redux";
import { Formik, Field, Form, FormikActions } from "formik";

import { Actions } from "../../../actions/profile";
import { IProfileDetails } from "../../../interface";
import { getUserProfileValidationSchema } from "../../../validation/validationSchema";

// import * as profileService from "../../../services/profile";

interface IOverviewProps {
  profileDetails: Array<IProfileDetails>;
  saveProfile: (profileDetails: IProfileDetails) => void;
}

interface IOverviewState {
  localprofileDetails: Array<IProfileDetails>;
}

interface IValues {
  name: string;
}

// interface IBasicProps {
//   profileInfo: IProfileDetails;
//   handleSubmit: (value: IValues) => void;
// }

class Profile extends React.Component<IOverviewProps, IOverviewState> {
  constructor(props: Readonly<IOverviewProps>) {
    super(props);
    this.state = {
      localprofileDetails: props.profileDetails
    };
  }

  componentDidUpdate(prevProps: IOverviewProps) {
    if (prevProps !== this.props) {
      this.setState({
        localprofileDetails: this.props.profileDetails
      });
    }
  }

  handleSubmit = async (values: any) => {
    try {
      console.log("?>>>>>>>>>>>>>>>>>>..", values);
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { localprofileDetails } = this.state;
    console.log("props in render>>>>....", this.state.localprofileDetails);
    return <Basic {...localprofileDetails} handleSubmit={this.handleSubmit} />;
  }
}

// const Basic: React.SFC<IBasicProps> = ({ profileInfo, handleSubmit }) => (
  const Basic = (profileInfo:any  ) =>
  <div className="container">
    {profileInfo._id ? (
      <Formik
        initialValues={{
          name: profileInfo.name
        }}
        validationSchema={getUserProfileValidationSchema}
        onSubmit={async (
          values: IValues,
          { setSubmitting }: FormikActions<IValues>
        ) => {
          // handleSubmit(values);
          try {
            // TODO Use notify
            // await profileService.updateUser(values, profileInfo._id);
            // const profileResponse: any = await profileService.fetchAllPosts();
            // this.props.saveProfile(profileResponse.data);
          } catch (err) {
            throw err;
          }
        }}
        render={props => (
          <div className="container">
            <Form>
              <div className="form-section">
                <div className="form-group">
                  <label
                    htmlFor="name"
                    className="form-group__label form-group__label--block"
                  >
                    Full Name
                  </label>
                  <Field
                    className="form-group__control"
                    id="name"
                    name="name"
                    type="text"
                    value={props.values.name || ""}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />

                  <button type="submit" className="btn btn--blue btn--lg">
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          </div>
        )}
      />
    ) : (
      <h2>User id not found</h2>
    )}
  </div>
// );

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
