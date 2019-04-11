import * as React from "react";
import { connect } from "react-redux";
import { Formik, Form, FormikActions } from "formik";
import { RouteComponentProps } from "react-router-dom";

import TextFieldWrapper from "../../inputComponents/TextFieldWrapper";

import { Actions } from "../../../actions/posts";
import { getLoggedInUserId } from "../../../utils/verifyUser";
import { createNewBlogSchema } from "../../../validation/validationSchema";

import * as routes from "../../../constants/routes";
import * as postService from "../../../services/posts";
import * as commentService from "../../../services/comment";

import {
  ICreateNewBlogValues,
  IBlogPostEditFormProps,
  IPostList
} from "../../../interface/commentInterface";
import { IPostDetails } from "../../../interface";
import Comment from "./comment/Comment";

interface IBlogListState {
  isLoading: boolean;
  isPostEditMode: boolean;
  isCommentEditMode: boolean;
  selectedComment: string;
  selectedSubCommentId: string;
}

interface IBlogListProps extends RouteComponentProps<{ id: string }> {
  currentPostDetails: IPostDetails;
  saveCurrentPost: (postDetails: IPostDetails) => void;
}

class BlogDetailView extends React.Component<IBlogListProps, IBlogListState> {
  constructor(props: Readonly<IBlogListProps>) {
    super(props);
    this.state = {
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

  fetchPostById = async () => {
    try {
      await postService.fetchPostById(this.props.match.params.id); // Dispatched inside
    } catch (error) {
      throw error;
    }
  };

  togglePostEditMode = () => {
    this.setState({ isPostEditMode: !this.state.isPostEditMode });
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

  render() {
    const { isPostEditMode } = this.state;
    const { currentPostDetails } = this.props;
    
    return (
      <div className="page">
        <div className="container">
          <div className="block">
            <div className="block__content">
              <div className="tabs">
                {currentPostDetails ? (
                  isPostEditMode ? (
                    <PostEdit
                      postId={this.props.match.params.id}
                      postInfo={currentPostDetails}
                      togglePostEditMode={this.togglePostEditMode}
                      handleSubmit={this.handleEditPost}
                    />
                  ) : (
                    <React.Fragment>
                      <PostList
                        postInfo={currentPostDetails || ""}
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
              <Comment
                fetchPostById={this.fetchPostById}
                postId={this.props.match.params.id}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
