import * as React from "react";
import { connect } from "react-redux";

import { IProfileDetails } from "../../../interface";

import { Actions } from "../../../actions/profile";
import { Formik, Field, Form, FormikActions } from "formik";

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

class Profile extends React.Component<IOverviewProps, IOverviewState> {
  constructor(props: Readonly<IOverviewProps>) {
    super(props);
    console.log("PROPS", props);
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
  render() {
    const { localprofileDetails } = this.state;
    console.log("props in render>>>>....", this.state.localprofileDetails);
    return <Basic {...localprofileDetails} />;
  }
}

const Basic = (
  profileInfo: any //TODO FIX THIS as interface
) => (
  <div className="container">
    <Formik
      initialValues={{
        name: profileInfo.name
      }}
      onSubmit={(
        values: IValues,
        { setSubmitting }: FormikActions<IValues>
      ) => {
        console.log("formik values>>>>>>>>>>>>>",{ values})
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
      render={props => (
        console.log("formik props", props, profileInfo),
        (
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
                    value={props.values.name}
                    onChnage={props.handleChange}
                    onBlur={props.handleBlur}
                  />

                  <button type="submit" className="btn btn--blue btn--lg">
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          </div>
        )
      )}
    />
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
