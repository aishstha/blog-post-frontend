import * as React from "react";
import { connect } from "react-redux";
import { Formik, Form, FormikActions } from "formik";
import { CSSTransition } from "react-transition-group";

import TextFieldWrapper from "../../inputComponents/TextFieldWrapper";

import { Actions } from "../../../actions/posts";
import { IPostDetails } from "../../../interface";

import * as tokenService from "../../../services/token";
import * as postService from "../../../services/posts";

interface IBlogListProps {
  savePost: (postDetails: Array<IPostDetails>) => void;
}
interface ICreateNewBlogFormProps {
  userId: string;
  isPopUpOpen: boolean;
  popUpClass: string;
  togglePopUp: () => void;
  handleSubmit: (value: ICreateNewBlogValues, id: string) => void;
}

interface ICreateBlogState {
  localnewPostDetails: IPostDetails | {};
  isLoading: boolean;
  isPopUpOpen: boolean;
}

interface ICreateNewBlogValues {
  title: string;
  description: string;
}

class CreateBlog extends React.Component<IBlogListProps, ICreateBlogState> {
  constructor(props: Readonly<IBlogListProps>) {
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

  handleSubmit = async (values: any, id: string) => {
    this.setState({
      isLoading: true
    });
    const data = {
      ...values,
      users: {
        _id: id
      }
    };
    try {
      await postService.createNewPost(data);

      const posts = await postService.fetchAllPosts();
      this.props.savePost(posts.data);
      this.setState({
        isLoading: false
      });
      this.togglePopUp();
    } catch (error) {
      this.setState({
        isLoading: false
      });
    }
  };

  render() {
    const popUpClass = this.state.isPopUpOpen ? "Popup" : "Popup Popup--hidden";
    const userId = tokenService.getUserId();

    return (
      <div className="container">
        <div className="block hidden-md">
          <div className="block__content">
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
                userId={userId}
                isPopUpOpen={this.state.isPopUpOpen}
                popUpClass={popUpClass}
                togglePopUp={this.togglePopUp}
                handleSubmit={this.handleSubmit}
              />
            </CSSTransition>
          </div>
        </div>
      </div>
    );
  }
}

const CreateNewBlogForm: React.SFC<ICreateNewBlogFormProps> = ({
  userId,
  popUpClass,
  togglePopUp,
  handleSubmit
}) => {
  return (
    <div className={popUpClass}>
      <div className="Popup__inner Popup-profile__inner">
        <div className="Popup__inner__row">
          <div className="Popup__inner__row__column Popup__inner__row__column--right">
            <div className="Popup__inner__header">
              Create New Blog
              <a className="close" onClick={togglePopUp}>
                <i className="material-icons">close</i>
              </a>
            </div>

            <Formik
              initialValues={{
                title: "",
                description: ""
              }}
              onSubmit={async (
                values: ICreateNewBlogValues,
                { setSubmitting }: FormikActions<ICreateNewBlogValues>
              ) => {
                handleSubmit(values, userId);
              }}
              render={props => (
                <div className="form-section">
                  <Form>
                    <div className="form-group">
                      <TextFieldWrapper
                        inputTypeClassName="form-group__control"
                        name="title"
                        type="text"
                        id="title"
                        value={props.values.title || ""}
                        label="Title"
                        placeholder="Title"
                        handleChange={props.handleChange}
                        handleBlur={props.handleBlur}
                      />
                      {props.errors.title && (
                        <div className="form-group__error">
                          {props.errors.title}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <TextFieldWrapper
                        inputTypeClassName="form-group__control"
                        name="description"
                        type="text"
                        id="description"
                        value={props.values.description || ""}
                        label="Description"
                        placeholder="Description"
                        handleChange={props.handleChange}
                        handleBlur={props.handleBlur}
                      />
                      {props.errors.description && (
                        <div className="form-group__error">
                          {props.errors.description}
                        </div>
                      )}
                    </div>

                    <button type="submit" className="btn btn--blue btn--lg">
                      Submit
                    </button>
                  </Form>
                </div>
              )}
            />
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
