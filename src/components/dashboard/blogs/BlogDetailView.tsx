import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { Actions } from "../../../actions/posts";
import { IPostDetails } from "../../../interface";
import { Formik, Form, FormikActions } from "formik";
import TextFieldWrapper from "../../inputComponents/TextFieldWrapper";

import * as postService from "../../../services/posts";
import * as commentService from "../../../services/comment";

import { createNewBlogSchema } from "../../../validation/validationSchema";

// interface IBlogListProps {
//   currentPostDetails: IPostDetails;
//   saveCurrentPost: (postDetails: IPostDetails) => void;
// }

interface IBlogListState {
  localpostDetails: any;
  isLoading: boolean;
  isEditMode: boolean;
}

interface IPostList {
  postInfo: IPostDetails;
  toggleEditMode: () => void;
}

interface IBlogPostEditFormProps {
  postInfo: IPostDetails;
  toggleEditMode: () => void;
  handleSubmit: (value: ICreateNewBlogValues, id: string) => void;
  postId: string;
}

interface ICreateNewBlogValues {
  title: string;
  description: string;
}

interface ICreateNewCommentValues {
  description: string;
}

interface IBlogListProps extends RouteComponentProps<{ id: string }> {
  currentPostDetails: IPostDetails;
  saveCurrentPost: (postDetails: IPostDetails) => void;
}

class BlogDetailView extends React.Component<IBlogListProps, IBlogListState> {
  constructor(props: Readonly<IBlogListProps>) {
    super(props);
    this.state = {
      localpostDetails: props.currentPostDetails
        ? props.currentPostDetails
        : "",
      isLoading: false,
      isEditMode: false
    };
  }

  componentDidMount() {
    this.fetchAllBlogPosts();
  }

  componentDidUpdate(prevProps: IBlogListProps) {
    if (prevProps !== this.props) {
      this.setState({
        localpostDetails: this.props.currentPostDetails
      });
    }
  }

  fetchAllBlogPosts = async () => {
    try {
      await postService.fetchPostById(this.props.match.params.id); //dispatched in service
    } catch (error) {
      throw error;
    }
  };

  toggleEditMode = () => {
    this.setState({ isEditMode: !this.state.isEditMode });
  };

  handleSubmit = async (values: any, id: string) => {
    this.setState({
      isLoading: true
    });
    try {
      await postService.updatePostById(values, id);
      this.setState({
        isLoading: false,
        isEditMode: false
      });
    } catch (error) {
      this.setState({
        isLoading: false
      });
    }
  };

  handleAddNewComment = async (values: any, id: string) => {
    this.setState({
      isLoading: true
    });
    try {
      await commentService.createNewComment(values, id);
    } catch (error) {
      this.setState({
        isLoading: false
      });
    }
  };

  render() {
    const { localpostDetails, isEditMode } = this.state;
    console.log("localpostDetails", localpostDetails);
    return (
      <div>
        <div className="page">
          <div className="container">
            <div className="block">
              <div className="block__content">
                <div className="tabs">
                  {localpostDetails ? (
                    isEditMode ? (
                      <PostEdit
                        postId={this.props.match.params.id}
                        postInfo={localpostDetails}
                        toggleEditMode={this.toggleEditMode}
                        handleSubmit={this.handleSubmit}
                      />
                    ) : (
                      <PostList
                        postInfo={localpostDetails || ""}
                        toggleEditMode={this.toggleEditMode}
                      />
                    )
                  ) : (
                    ""
                  )}
                </div>

                <div className="block">
                  <div className="block__content" />
                  <div className="tabs">
                    <div className="tabs__content">
                      <div className="tabs__content__pane active">
                        {/* {localpostDetails.comments &&
                        localpostDetails.comments.length > 0 ? ( */}
                        <div className="Block-white Block-product">
                          <Formik
                            initialValues={{
                              description: ""
                            }}
                            onSubmit={async (
                              values: ICreateNewCommentValues,
                              {
                                setSubmitting
                              }: FormikActions<ICreateNewCommentValues>
                            ) => {
                              console.log("values", values);
                              this.handleAddNewComment(
                                values,
                                localpostDetails.id
                              ); // TODO: Get id from global state
                            }}
                            render={props => (
                              <div className="form-section">
                                <Form>
                                  <div className="form-group">
                                    <TextFieldWrapper
                                      inputTypeClassName="form-group__control"
                                      name="description"
                                      type="text"
                                      id="description"
                                      value={props.values.description || ""}
                                      label="Add new Comment"
                                      placeholder="New comment here"
                                      handleChange={props.handleChange}
                                      handleBlur={props.handleBlur}
                                    />
                                    {props.errors.description && (
                                      <div className="form-group__error">
                                        {props.errors.description}
                                      </div>
                                    )}
                                  </div>

                                  <button
                                    type="submit"
                                    className="btn btn--blue btn--lg"
                                  >
                                    Submit
                                  </button>
                                </Form>
                              </div>
                            )}
                          />
                        </div>
                        {/* ) : (
                          <div className="Block-white Block-product">
                            <p>Add new comment</p>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const PostEdit: React.SFC<IBlogPostEditFormProps> = ({
  postInfo,
  toggleEditMode,
  handleSubmit,
  postId
}) => {
  return (
    <div className="tabs__content">
      <div className="tabs__content__pane active" id="advertisement">
        <div className="Block-white Block-product">
          <div className="form-section">
            <Formik
              initialValues={{
                title: postInfo.title,
                description: postInfo.description
              }}
              validationSchema={createNewBlogSchema}
              onSubmit={async (
                values: ICreateNewBlogValues,
                { setSubmitting }: FormikActions<ICreateNewBlogValues>
              ) => {
                handleSubmit(values, postId);
              }}
              render={props => (
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
                    UPDATE
                  </button>
                  <button
                    className="btn btn--blue btn--lg"
                    onClick={toggleEditMode}
                  >
                    CANCLE
                  </button>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const PostList: React.SFC<IPostList> = props => {
  const { postInfo, toggleEditMode } = props;
  return (
    <div className="tabs__content">
      <div className="tabs__content__pane active" id="advertisement">
        <div className="Block-white Block-product">
          <div className="Block-product__content">
            <h2>
              {postInfo.title}
              <span className="Batch Batch--yellow Batch--icon">
                {postInfo.user ? postInfo.user.name : "User not found"}
              </span>
            </h2>
            <span className="publisher">Description:</span>
            <span className="budget">{postInfo.description}</span>
          </div>
          <div className="Block-product__btn">
            <div className="btn btn--blue" onClick={toggleEditMode}>
              EDIT
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ postReducer }: any) => {
  return {
    currentPostDetails: postReducer.currentPostDetails
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  saveCurrentPost: (currentPostDetails: IPostDetails) =>
    dispatch(Actions.storeCurrentPosts(currentPostDetails))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogDetailView);
