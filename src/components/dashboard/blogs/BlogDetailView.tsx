import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { Actions } from "../../../actions/posts";
import { IPostDetails, ICreateNewCommentValues } from "../../../interface";
import { Formik, Form, FormikActions } from "formik";
import TextFieldWrapper from "../../inputComponents/TextFieldWrapper";

import * as postService from "../../../services/posts";
import * as commentService from "../../../services/comment";
import SubCommentList from "./subComment/SubcommentList";

import {
  createNewBlogSchema,
  createNewCommenSchema
} from "../../../validation/validationSchema";
import AddSubComment from "./subComment/AddSubComment";

interface IBlogListState {
  localpostDetails: any;
  isLoading: boolean;
  isPostEditMode: boolean;
  isCommentEditMode: boolean;
  selectedComment: string;
}

interface IPostList {
  postInfo: IPostDetails;
  togglePostEditMode: () => void;
}

interface IBlogPostEditFormProps {
  postInfo: IPostDetails;
  togglePostEditMode: () => void;
  handleSubmit: (value: ICreateNewBlogValues, id: string, isValid: any) => void;
  postId: string;
}

interface ICreateNewBlogValues {
  title: string;
  description: string;
}

// interface ICreateNewCommentValues {
//   description: string;
// }

interface IBlogListProps extends RouteComponentProps<{ id: string }> {
  currentPostDetails: IPostDetails;
  saveCurrentPost: (postDetails: IPostDetails) => void;
}

interface ICommentViewProps {
  comment: any; //TODO CHANGE
}

interface ICommentEditProps {
  comment: any; //TODO CHANGE
  handleCommentEdit: (id: string, values: any) => void;
  toggleCommentEditMode: (id: string) => void;
  resetComment: () => void;
}

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
      isCommentEditMode: false
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
      await postService.fetchPostById(this.props.match.params.id); //dispatched in service
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

  resetComment = () => {
    this.setState({
      isCommentEditMode: false,
      selectedComment: ""
    });
  };

  handleSubmit = async (values: any, id: string, isValid: any) => {
    this.setState({
      isLoading: true
    });
    try {
      await postService.updatePostById(values, id);
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

  onCommentDelete = async (commentId: string) => {
    this.setState({
      isLoading: true
    });
    try {
      console.log("commentI1233333333333d", commentId);
      await commentService.deleteCommentById(commentId);
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
                        handleSubmit={this.handleSubmit}
                      />
                    ) : (
                      <PostList
                        postInfo={localpostDetails || ""}
                        togglePostEditMode={this.togglePostEditMode}
                      />
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
                                    Submit
                                  </button>
                                </Form>
                              </div>
                            )}
                          />
                        </div>
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
                                      <CommentList comment={comment} />{" "}
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
                                          this.toggleCommentEditMode(
                                            comment._id
                                          )
                                        }
                                      >
                                        <i className="material-icons">edit</i>
                                      </span>
                                      {/* Subcomment Open */}
                                      <AddSubComment
                                        fetchPostById={this.fetchPostById}
                                        postId={this.props.match.params.id}
                                        commentId={comment._id}
                                      />
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
                                                  <SubCommentList
                                                    comment={subComment}
                                                  />
                                                </React.Fragment>
                                              );
                                            }
                                          )
                                        : "No subcomments found"}
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

// const EditSubComment: React.SFC<{}> = () => {
//   return (
//     <React.Fragment>
//       <div className="tabs">
//         <div className="tabs__content">
//           <div className="tabs__content__pane active">
//             <div className="Block-white Block-product">
//               Sub scomment title
//               <span className="Batch Batch--yellow Batch--icon">
//                 name users{" "}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// const SubCommentList: React.SFC<{}> = () => {
//   return (
//     <React.Fragment>
//       <div className="tabs">
//         <div className="tabs__content">
//           <div className="tabs__content__pane active">
//             <div className="Block-white Block-product">
//               Sub scomment title
//               <span className="Batch Batch--yellow Batch--icon">
//                 name users{" "}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

const EditComment: React.SFC<ICommentEditProps> = ({
  comment,
  handleCommentEdit,
  toggleCommentEditMode,
  resetComment
}) => {
  console.log(toggleCommentEditMode);
  return (
    <React.Fragment>
      {/* {comment.description}{" "}
      <span className="Batch Batch--yellow Batch--icon">
        {comment.users ? comment.users.name : "User not found"}
      </span> */}

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
            <button
              className="btn btn--blue btn--lg"
              onClick={resetComment}
              // onClick={toggleCommentEditMode(comment._id)} TODO
            >
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
  const { postInfo, togglePostEditMode } = props;
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
          <div className="Block-product__btn">
            <div className="btn btn--blue" onClick={togglePostEditMode}>
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
