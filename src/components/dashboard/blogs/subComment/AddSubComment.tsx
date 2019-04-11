import * as React from "react";
import { connect } from "react-redux";

import { Actions } from "../../../../actions/comment";
import {
  ICommentDetails,
  ICreateNewCommentValues
} from "../../../../interface";
import { Formik, Form, FormikActions } from "formik";
import TextFieldWrapper from "../../../inputComponents/TextFieldWrapper";

import * as commentService from "../../../../services/comment";

interface IAddSubCommentProps {
  fetchPostById: () => void;
  postId: string;
  commentId: string;
}

interface IAddSubCommentState {
  localSubCommentDetails: string;
  postId: string;
  commentId: string;
}

class AddSubComment extends React.Component<
  IAddSubCommentProps,
  IAddSubCommentState
> {
  constructor(props: Readonly<IAddSubCommentProps>) {
    super(props);
    this.state = {
      localSubCommentDetails: "",
      postId: props.postId,
      commentId: props.commentId
    };
  }

  handleAddNewComment = async (values: any, id: string, commentId: string) => {
    try {
      await commentService.createSubComment(values, commentId);
      this.props.fetchPostById();
    } catch (error) {
      console.log("error", error);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          initialValues={{
            description: ""
          }}
          onSubmit={async (
            values: ICreateNewCommentValues,
            { setSubmitting }: FormikActions<ICreateNewCommentValues>
          ) => {
            this.handleAddNewComment(
              values,
              this.state.postId,
              this.state.commentId
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
                    label="Add sub comment"
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

                <button type="submit" className="btn btn--blue btn--lg">
                  Submit
                </button>
              </Form>
            </div>
          )}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ postReducer }: any) => {
  return {
    currentPostDetails: postReducer.currentPostDetails
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  saveCurrentPost: (description: ICommentDetails) =>
    dispatch(Actions.storeNewComment(description))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSubComment);
