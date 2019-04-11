import * as React from "react";
import { connect } from "react-redux";

import { Actions } from "../../../../actions/posts";

import {
  ICommentEditProps,
  ICreateNewBlogValues,
  ICommentViewProps
} from "../../../../interface/commentInterface";

import { IPostDetails, ICreateNewCommentValues } from "../../../../interface";
import { getLoggedInUserId, verifyUser } from "../../../../utils/verifyUser";

import { Formik, Form, FormikActions } from "formik";
import TextFieldWrapper from "../../../inputComponents/TextFieldWrapper";

import { createNewCommenSchema } from "../../../../validation/validationSchema";

import AddSubComment from "./../subComment/AddSubComment";
import EditSubcomment from "./../subComment/EditSubcomment";

import SubCommentList from "./../subComment/SubcommentList";

import * as commentService from "../../../../services/comment";

interface ICommentProps {
  fetchPostById: () => void;
  postId: string;
  currentPostDetails: IPostDetails;
}

interface ICommentState {
  postId: string;
  selectedComment: string;
  isCommentEditMode: boolean;
  selectedSubCommentId: string;
}

class Comment extends React.Component<ICommentProps, ICommentState> {
  constructor(props: Readonly<ICommentProps>) {
    super(props);
    this.state = {
      selectedComment: "",
      isCommentEditMode: false,
      selectedSubCommentId: "",
      postId: props.postId
    };
  }

  handleAddNewComment = async (values: any, id: string) => {
    try {
      await commentService.createNewComment(values, id);
      this.props.fetchPostById();
    } catch (error) {
      throw error;
    }
  };

  setSubCommentEditMode = (subCommentId: string) => {
    this.setState({
      selectedSubCommentId: subCommentId
    });
  };

  onSubCommentDelete = async (commentId: string, subCommentId: string) => {
    try {
      await commentService.deleteSubCommentById(commentId, subCommentId);
      this.props.fetchPostById();
    } catch (error) {
      throw error;
    }
  };

  toggleCommentEditMode = (id: string) => {
    this.setState({
      isCommentEditMode: !this.state.isCommentEditMode,
      selectedComment: id
    });
  };

  onCommentDelete = async (commentId: string) => {
    try {
      await commentService.deleteCommentById(commentId);
      this.props.fetchPostById();
    } catch (error) {
      throw error;
    }
  };

  handleCommentEdit = async (commentId: string, data: any) => {
    try {
      await commentService.editComment(commentId, data);
      this.props.fetchPostById();
      this.setState({ isCommentEditMode: false, selectedComment: "" });
    } catch (error) {
      this.setState({
        isCommentEditMode: false
      });
    }
  };

  resetComment = () => {
    this.setState({
      isCommentEditMode: false,
      selectedComment: ""
    });
  };

  render() {
    const { postId } = this.state;
    const { currentPostDetails } = this.props;

    return (
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
                      this.handleAddNewComment(values, postId);
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

              {currentPostDetails &&
                currentPostDetails.comments &&
                currentPostDetails.comments.length > 0 && <h2>Comment List</h2>}

              {currentPostDetails &&
                currentPostDetails.comments &&
                currentPostDetails.comments.length > 0 &&
                currentPostDetails.comments.map(
                  (comment: any, index: number) => {
                    return (
                      <div className="Block-white Block-product" key={index}>
                        {this.state.selectedComment === comment._id ? (
                          <EditComment
                            comment={comment}
                            handleCommentEdit={this.handleCommentEdit}
                            toggleCommentEditMode={this.toggleCommentEditMode}
                            resetComment={this.resetComment}
                          />
                        ) : (
                          <React.Fragment>
                            <CommentList comment={comment} />
                            {getLoggedInUserId() &&
                              verifyUser(
                                comment.users._id,
                                currentPostDetails.users._id
                              ) && (
                                <React.Fragment>
                                  <span
                                    className="delete-image"
                                    onClick={() =>
                                      this.onCommentDelete(comment._id)
                                    }
                                  >
                                    <i className="material-icons">delete</i>
                                  </span>
                                  <span
                                    className="delete-image"
                                    onClick={() =>
                                      this.toggleCommentEditMode(comment._id)
                                    }
                                  >
                                    <i className="material-icons">edit</i>
                                  </span>{" "}
                                </React.Fragment>
                              )}
                            {getLoggedInUserId() && (
                              <AddSubComment
                                fetchPostById={this.props.fetchPostById}
                                postId={postId}
                                commentId={comment._id}
                              />
                            )}
                            {comment.sub_comments &&
                            comment.sub_comments.length > 0
                              ? comment.sub_comments.map(
                                  (subComment: any, index2: number) => {
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
                                                    subComment={subComment}
                                                    setSubCommentEditMode={
                                                      this.setSubCommentEditMode
                                                    }
                                                    commentId={comment._id}
                                                    fetchPostById={
                                                      this.props.fetchPostById
                                                    }
                                                  />
                                                ) : (
                                                  <SubCommentList
                                                    comment={subComment}
                                                  />
                                                )}
                                                {getLoggedInUserId() &&
                                                  verifyUser(
                                                    subComment.users._id,
                                                    currentPostDetails.users._id
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
      {console.log("coment", comment)}
      <div className="tabs__content__pane active">
        {comment.description}{" "}
        <span className="Batch Batch--yellow Batch--icon">
          {comment.users ? comment.users.name : "User not found"}
        </span>
      </div>
    </React.Fragment>
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
)(Comment);
