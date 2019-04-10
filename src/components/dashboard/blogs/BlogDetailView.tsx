import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { Actions } from "../../../actions/posts";
import { IPostDetails } from "../../../interface";
import { Formik, Form, FormikActions } from "formik";
import TextFieldWrapper from "../../inputComponents/TextFieldWrapper";

import * as postService from "../../../services/posts";
import { createNewBlogSchema } from "../../../validation/validationSchema";

interface IBlogListProps {
  currentPostDetails: IPostDetails;
  saveCurrentPost: (postDetails: IPostDetails) => void;
}

interface IBlogListState {
  localpostDetails: any;
  isLoading: boolean;
  isEditMode: boolean;
}

interface IPostList {
  postInfo: IPostDetails;
  toggleEditMode: () => void;
}

interface ICreateNewBlogValues {
  title: string;
  description: string;
}

interface IBlogListProps extends RouteComponentProps<{ id: string }> {
  postDetails: string;
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

  render() {
    const { localpostDetails, isEditMode } = this.state;
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
                        postInfo={localpostDetails}
                        toggleEditMode={this.toggleEditMode}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const PostEdit: React.SFC<IPostList> = ({ postInfo, toggleEditMode }) => {
  return (
    <div className="tabs__content">
      <div className="tabs__content__pane active" id="advertisement">
        <div className="Block-white Block-product">
          <div className="Block-product__btn">
            <div className="btn btn--blue" onClick={toggleEditMode}>
              GET OUT FROM EDIT MODE
            </div>
          </div>
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
              // handleSubmit(values, userId); // TODO: Get id from global state
            }}
            render={props => (
              <div className="container">
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
              </div>
            )}
          />
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
                {postInfo.users ? postInfo.users.name : "User not found"}
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
