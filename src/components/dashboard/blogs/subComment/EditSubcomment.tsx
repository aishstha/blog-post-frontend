import * as React from "react";
import { connect } from "react-redux";

// import { Actions } from "../../../../actions/comment";
import { ICommentDetails } from "../../../../interface";
import { Formik, Form, FormikActions } from "formik";
import TextFieldWrapper from "../../../inputComponents/TextFieldWrapper";
import { ICreateNewCommentValues } from "../../../../interface";

import * as commentService from "../../../../services/comment";

interface ISubCommentProps {
  subComment: ICommentDetails;
  commentId: string;
  setSubCommentEditMode: (subCommentId: string) => void;
  fetchPostById: () => void;
}

interface ISubCommentState {
  subComment: ICommentDetails;
  commentId: string;
}

class EditSubComment extends React.Component<
  ISubCommentProps,
  ISubCommentState
> {
  constructor(props: Readonly<ISubCommentProps>) {
    super(props);
    this.state = {
      subComment: props.subComment,
      commentId: props.commentId
    };
  }

  // componentDidUpdate(prevProps: ISubCommentProps) {
  //   if (prevProps !== this.props) {
  //     this.setState({
  //       localSubCommentDetails: this.props.comment
  //     });
  //   }
  // }

  cancelEditMode = () => {
    this.props.setSubCommentEditMode("");
  };

  handleSubCommentEdit = async (
    subCommentId: string,
    commentId: string,
    data: any
  ) => {
    try {
      await commentService.editSubComment(commentId, subCommentId, data);
      this.cancelEditMode();
      this.props.fetchPostById();
    } catch (error) {
      throw error;
    }
  };

  render() {
    console.log("ashbdasasdasd", this.state.subComment);
    return (
      <React.Fragment>
        <Formik
          initialValues={{
            description: this.state.subComment.description
          }}
          onSubmit={async (
            values: ICreateNewCommentValues,
            { setSubmitting }: FormikActions<ICreateNewCommentValues>
          ) => {
            console.log("values", values);
            this.handleSubCommentEdit(
              this.state.subComment._id,
              this.state.commentId,
              values
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
                    label="Edit sub comment"
                    placeholder="Edit sub comment"
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
                <button
                  className="btn btn--blue btn--lg"
                  onClick={this.cancelEditMode}
                >
                  Cancel
                </button>
              </Form>
            </div>
          )}
        />
      </React.Fragment>
    );
  }
}

// const EditSubComment: React.SFC<SubCommentList> = ({
//   localSubCommentDetails
// }) => {
//   return (
//     <React.Fragment>
//       <div className="tabs">
//         <div className="tabs__content">
//           <div className="tabs__content__pane active">
//             <div className="Block-white Block-product">
//               {localSubCommentDetails.description}
//               <span className="Batch Batch--yellow Batch--icon">
//                 {localSubCommentDetails.users.name}
//               </span>
//               <span
//                 className="delete-image"
//                 // onClick={() => this.onCommentDelete(comment._id)}
//               >
//                 <i className="material-icons">delete</i>
//               </span>
//               <span
//                 className="delete-image"
//                 // onClick={() => this.toggleCommentEditMode(comment._id)}
//               >
//                 <i className="material-icons">edit</i>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// const SubCommentList: React.SFC<SubCommentList> = ({
//   localSubCommentDetails
// }) => {
//   return (
//     <React.Fragment>
//       <div className="tabs">
//         <div className="tabs__content">
//           <div className="tabs__content__pane active">
//             <div className="Block-white Block-product">
//               {localSubCommentDetails.description}
//               <span className="Batch Batch--yellow Batch--icon">
//                 {localSubCommentDetails.users.name}
//               </span>
//               <span
//                 className="delete-image"
//                 // onClick={() => this.onCommentDelete(comment._id)}
//               >
//                 <i className="material-icons">delete</i>
//               </span>
//               <span
//                 className="delete-image"
//                 // onClick={() => this.toggleCommentEditMode(comment._id)}
//               >
//                 <i className="material-icons">edit</i>
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

const mapStateToProps = ({ postReducer }: any) => {
  return {
    // currentPostDetails: postReducer.currentPostDetails
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  // saveCurrentPost: (description: ICommentDetails) =>
  //   dispatch(Actions.storeNewComment(description))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSubComment);
