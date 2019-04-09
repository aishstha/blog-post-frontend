import * as React from "react";
import { connect } from "react-redux";
import { Form } from "formik";
import { CSSTransition } from "react-transition-group";

// import TextFieldWrapper from "../../inputComponents/TextFieldWrapper";

import { Actions } from "../../../actions/posts";
import { IPostDetails } from "../../../interface";

// import * as postService from "../../../services/posts";

// interface ICreateBlogProps {
//   // postDetails: Array<IPostDetails>;
//   // savePost: (postDetails: Array<IPostDetails>) => void;
// }

// interface ICreateBlogProps {
//   profileDetails:  Array<IPostDetails>;
//   saveProfile: (profileDetails:  Array<IPostDetails>) => void;
// }

interface ICreateNewBlogFormProps {
  isPopUpOpen: boolean;
  popUpClass: string;
  togglePopUp: () => void;
}

interface ICreateBlogState {
  localnewPostDetails: IPostDetails | {};
  isLoading: boolean;
  isPopUpOpen: boolean;
}

class CreateBlog extends React.Component<{}, ICreateBlogState> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      localnewPostDetails: {},
      isLoading: false,
      isPopUpOpen: false
    };
  }

  togglePopUp = () => {
    this.setState({
      isPopUpOpen: !this.state.isPopUpOpen
    });
  };

  render() {
    const popUpClass = this.state.isPopUpOpen ? "Popup" : "Popup Popup--hidden";
    return (
      <div className="container">
        <div className="block hidden-md">
          <div className="block__content">
            <div className="block__title">{/* <h2>Advertisement</h2> */}</div>
            <div className="Block-white">
              <div
                className="btn btn--blue btn--icon"
                onClick={() => this.togglePopUp()}
              >
                <i className="material-icons">add</i> Create New Blog
              </div>
            </div>
            <CSSTransition
              in={this.state.isPopUpOpen}
              timeout={300}
              classNames="popup"
              unmountOnExit={false}
            >
              <CreateNewBlogForm
                isPopUpOpen={this.state.isPopUpOpen}
                popUpClass={popUpClass}
                togglePopUp={this.togglePopUp}
              />
            </CSSTransition>
          </div>
        </div>
      </div>
    );
  }
}

const CreateNewBlogForm: React.SFC<ICreateNewBlogFormProps> = props => {
  const { isPopUpOpen, popUpClass, togglePopUp } = props;
  console.log("isPopUpOpen", isPopUpOpen);
  return (
    <div className={popUpClass}>
      <div className="Popup__inner Popup-profile__inner">
        <div className="Popup__inner__row">
          <div className="Popup__inner__row__column Popup__inner__row__column--right">
            <div className="Popup__inner__header">
              Create new Blog
              <a className="close" onClick={togglePopUp}>
                <i className="material-icons">close</i>
              </a>
            </div>
            <div className="form-section">
              <Form>
                <div className="form-group">
                  {/* <TextFieldWrapper
                inputTypeClassName="form-group__control"
                name="oldPassword"
                type="password"
                value="asa"
                label="Old Password"
                placeholder="Old Password"
                // handleChange={handleChange}
                // handleBlur={handleBlur}
              /> */}

                  {/* {errors.oldPassword &&
            (touched.oldPassword || values.oldPassword) && (
              <div className="form-group__error">
                {errors.oldPassword}
              </div>
            )} */}
                </div>
                <div className="form-group">
                  <button className="btn btn--blue btn--lg" type="submit">
                    Update Information
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ postReducer }: any) => {
  return { postDetails: postReducer.postDetails };
};

const mapDispatchToProps = (dispatch: any) => ({
  savePost: (postDetails: Array<IPostDetails>) =>
    dispatch(Actions.storePosts(postDetails))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBlog);
