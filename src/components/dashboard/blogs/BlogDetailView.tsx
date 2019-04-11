import * as React from "react";
import { connect } from "react-redux";

import { Actions } from "../../../actions/posts";
import { Formik, Form, FormikActions } from "formik";
import TextFieldWrapper from "../../inputComponents/TextFieldWrapper";

import * as postService from "../../../services/posts";
import * as commentService from "../../../services/comment";
import SubCommentList from "./subComment/SubcommentList";
import { getLoggedInUserId, verifyUser } from "../../../utils/verifyUser";

import {
  createNewBlogSchema,
  createNewCommenSchema
} from "../../../validation/validationSchema";
import AddSubComment from "./subComment/AddSubComment";
import EditSubcomment from "./subComment/EditSubcomment";
import * as routes from "../../../constants/routes";

import {
  IBlogListProps,
  IBlogListState,
  ICommentEditProps,
  ICreateNewBlogValues,
  ICommentViewProps,
  IBlogPostEditFormProps,
  IPostList
} from "../../../interface/commentInterface";
import { IPostDetails, ICreateNewCommentValues } from "../../../interface";

class BlogDetailView extends React.Component<IBlogListProps, IBlogListState> {
  constructor(props: Readonly<IBlogListProps>) {
    super(props);
    this.state = {
      localpostDetails: props.currentPostDetails
        ? props.currentPostDetails
        : "",
      selectedComment: "",
      isLoading: false,
      isPostEditMode: false,
      isCommentEditMode: false,
      selectedSubCommentId: ""
    };
  }

  componentDidMount() {
    this.fetchPostById();
  }

  componentDidUpdate(prevProps: IBlogListProps) {
    if (prevProps !== this.props) {
      this.setState({
        localpostDetails: this.props.currentPostDetails
      });
    }
  }

  fetchPostById = async () => {
    try {
      const response = await postService.fetchPostById(
        this.props.match.params.id
      ); //dispatched in service
      console.log("response", response);
    } catch (error) {
      throw error;
    }
  };

  togglePostEditMode = () => {
    this.setState({ isPostEditMode: !this.state.isPostEditMode });
  };

  toggleCommentEditMode = (id: string) => {
    this.setState({
      isCommentEditMode: !this.state.isCommentEditMode,
      selectedComment: id
    });
  };

  setSubCommentEditMode = (subCommentId: string) => {
    this.setState({
      selectedSubCommentId: subCommentId
    });
  };

  resetComment = () => {
    this.setState({
      isCommentEditMode: false,
      selectedComment: ""
    });
  };

  handleEditPost = async (values: any, id: string, isValid: any) => {
    this.setState({
      isLoading: true
    });
    try {
      await postService.updatePostById(values, id);
      this.fetchPostById();

      this.setState({
        isLoading: false,
        isPostEditMode: false
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
      this.fetchPostById();
    } catch (error) {
      this.setState({
        isLoading: false
      });
    }
  };

  onPostDelete = async (postId: string) => {
    try {
      await commentService.deletePostById(postId);
      location.replace(routes.DASHBOARD);
    } catch (error) {
      this.setState({
        isLoading: false
      });
    }
  };

  onCommentDelete = async (commentId: string) => {
    this.setState({
      isLoading: true
    });
    try {
      await commentService.deleteCommentById(commentId);
      this.fetchPostById();
    } catch (error) {
      this.setState({
        isLoading: false
      });
    }
  };

  onSubCommentDelete = async (commentId: string, subCommentId: string) => {
    this.setState({
      isLoading: true
    });
    try {
      await commentService.deleteSubCommentById(commentId, subCommentId);
      this.fetchPostById();
    } catch (error) {
      this.setState({
        isLoading: false
      });
    }
  };

  handleCommentEdit = async (commentId: string, data: any) => {
    try {
      await commentService.editComment(commentId, data);
      this.fetchPostById();
      this.setState({ isCommentEditMode: false, selectedComment: "" });
    } catch (error) {
      this.setState({
        isCommentEditMode: false
      });
    }
  };

  render() {
    const { localpostDetails, isPostEditMode } = this.state;
    return (
      <div>
        <div className="page">
          <div className="container">
            <div className="block">
              <div className="block__content">
                <div className="tabs">
                  {localpostDetails ? (
                    isPostEditMode ? (
                      <PostEdit
                        postId={this.props.match.params.id}
                        postInfo={localpostDetails}
                        togglePostEditMode={this.togglePostEditMode}
                        handleSubmit={this.handleEditPost}
                      />
                    ) : (
                      <React.Fragment>
                        <PostList
                          postInfo={localpostDetails || ""}
                          togglePostEditMode={this.togglePostEditMode}
                          onPostDelete={this.onPostDelete}
                        />
                        <React.Fragment />
                      </React.Fragment>
                    )
                  ) : (
                    ""
                  )}
                </div>
                {/* COMMENT SECTION OPEN */}
                <div className="block">
                  <div className="block__content" />
                  <div className="tabs">
                    <div className="tabs__content">
                      <div className="tabs__content__pane active">
                        {getLoggedInUserId() && (
                          <div className="Block-white Block-product">
                            <Formik
                              initialValues={{
                                description: ""
                              }}
                              onSubmit={async (
                                values: ICreateNewCommentValues,
                                {
                                  setSubmitting,
                                  resetForm
                                }: FormikActions<ICreateNewCommentValues>
                              ) => {
                                resetForm({ description: "" });
                                this.handleAddNewComment(
                                  values,
                                  localpostDetails.id
                                );
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
                                      Comment
                                    </button>
                                  </Form>
                                </div>
                              )}
                            />
                          </div>
                        )}

                        {localpostDetails.comments &&
                          localpostDetails.comments.length > 0 && (
                            <h2>Comment List</h2>
                          )}

                        {localpostDetails.comments &&
                          localpostDetails.comments.length > 0 &&
                          localpostDetails.comments.map(
                            (comment: any, index: number) => {
                              return (
                                <div
                                  className="Block-white Block-product"
                                  key={index}
                                >
                                  {this.state.selectedComment ===
                                  comment._id ? (
                                    <EditComment
                                      comment={comment}
                                      handleCommentEdit={this.handleCommentEdit}
                                      toggleCommentEditMode={
                                        this.toggleCommentEditMode
                                      }
                                      resetComment={this.resetComment}
                                    />
                                  ) : (
                                    <React.Fragment>
                                      <CommentList comment={comment} />
                                      {getLoggedInUserId() &&
                                        verifyUser(
                                          comment.users._id,
                                          localpostDetails.users._id
                                        ) && (
                                          <React.Fragment>
                                            <span
                                              className="delete-image"
                                              onClick={() =>
                                                this.onCommentDelete(
                                                  comment._id
                                                )
                                              }
                                            >
                                              <i className="material-icons">
                                                delete
                                              </i>
                                            </span>
                                            <span
                                              className="delete-image"
                                              onClick={() =>
                                                this.toggleCommentEditMode(
                                                  comment._id
                                                )
                                              }
                                            >
                                              <i className="material-icons">
                                                edit
                                              </i>
                                            </span>{" "}
                                          </React.Fragment>
                                        )}
                                      {/* Subcomment Open */}
                                      {getLoggedInUserId() && (
                                        <AddSubComment
                                          fetchPostById={this.fetchPostById}
                                          postId={this.props.match.params.id}
                                          commentId={comment._id}
                                        />
                                      )}
                                      {/* Subcomment Close */}
                                      {comment.sub_comments &&
                                      comment.sub_comments.length > 0
                                        ? comment.sub_comments.map(
                                            (
                                              subComment: any,
                                              index2: number
                                            ) => {
                                              return (
                                                <React.Fragment key={index2}>
                                                  <div className="tabs">
                                                    <div className="tabs__content">
                                                      <div className="tabs__content__pane active">
                                                        <div className="Block-white Block-product">
                                                          {this.state
                                                            .selectedSubCommentId ===
                                                          subComment._id ? (
                                                            <EditSubcomment
                                                              subComment={
                                                                subComment
                                                              }
                                                              setSubCommentEditMode={
                                                                this
                                                                  .setSubCommentEditMode
                                                              }
                                                              commentId={
                                                                comment._id
                                                              }
                                                              fetchPostById={
                                                                this
                                                                  .fetchPostById
                                                              }
                                                            />
                                                          ) : (
                                                            <SubCommentList
                                                              comment={
                                                                subComment
                                                              }
                                                            />
                                                          )}
                                                          {getLoggedInUserId() &&
                                                            verifyUser(
                                                              subComment.users
                                                                ._id,
                                                              localpostDetails
                                                                .users._id
                                                            ) && (
                                                              <React.Fragment>
                                                                <span
                                                                  className="delete-image"
                                                                  onClick={() =>
                                                                    this.onSubCommentDelete(
                                                                      comment._id,
                                                                      subComment._id
                                                                    )
                                                                  }
                                                                >
                                                                  <i className="material-icons">
                                                                    delete
                                                                  </i>
                                                                </span>
                                                                <span
                                                                  className="delete-image"
                                                                  onClick={() =>
                                                                    this.setSubCommentEditMode(
                                                                      subComment._id
                                                                    )
                                                                  }
                                                                >
                                                                  <i className="material-icons">
                                                                    edit
                                                                  </i>
                                                                </span>
                                                              </React.Fragment>
                                                            )}
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </React.Fragment>
                                              );
                                            }
                                          )
                                        : ""}
                                      {/* // <EditSubComment /> */}
                                    </React.Fragment>
                                  )}
                                </div>
                              );
                            }
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* COMMENT SECTION CLOSE */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const EditComment: React.SFC<ICommentEditProps> = ({
  comment,
  handleCommentEdit,
  toggleCommentEditMode,
  resetComment
}) => {
  return (
    <React.Fragment>
      <Formik
        initialValues={{
          description: comment.description
        }}
        validationSchema={createNewCommenSchema}
        onSubmit={async (
          values: ICreateNewBlogValues,
          { setSubmitting }: FormikActions<ICreateNewBlogValues>
        ) => {
          handleCommentEdit(comment._id, values);
        }}
        render={props => (
          <Form>
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
            <button className="btn btn--blue btn--lg" onClick={resetComment}>
              CANCEL
            </button>
          </Form>
        )}
      />
    </React.Fragment>
  );
};

const CommentList: React.SFC<ICommentViewProps> = ({ comment }) => {
  return (
    <React.Fragment>
      <div className="tabs__content__pane active">
        {comment.description}{" "}
        <span className="Batch Batch--yellow Batch--icon">
          {comment.users ? comment.users.name : "User not found"}
        </span>
      </div>
    </React.Fragment>
  );
};

const PostEdit: React.SFC<IBlogPostEditFormProps> = ({
  postInfo,
  togglePostEditMode,
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
                handleSubmit(values, postId, "aa");
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
                    onClick={togglePostEditMode}
                  >
                    CANCEL
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
  const { postInfo, togglePostEditMode, onPostDelete } = props;
  return (
    <div className="tabs__content">
      <div className="tabs__content__pane active" id="advertisement">
        <div className="Block-white Block-product">
          <div className="Block-product__content">
            <h2>
              {postInfo.title}
              <span className="Batch Batch--yellow Batch--icon">
                {postInfo.users ? postInfo.users.name : "User not found"}
              </span>
            </h2>
            <span className="publisher">Description:</span>
            <span className="budget">{postInfo.description}</span>
          </div>
          {getLoggedInUserId() && (
            <div className="Block-product__btn">
              <div className="btn btn--blue" onClick={togglePostEditMode}>
                EDIT
              </div>
              <span
                className="delete-image"
                onClick={() => onPostDelete(postInfo.id || postInfo._id)}
              >
                <i className="material-icons">delete</i>
              </span>
            </div>
          )}
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
