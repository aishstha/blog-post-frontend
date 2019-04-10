// import * as React from "react";
// import { connect } from "react-redux";

// import { Actions } from "../../../actions/comment";
// import { INewComment } from "../../../interface";
// import { Formik, Form, FormikActions } from "formik";
// import TextFieldWrapper from "../../inputComponents/TextFieldWrapper";

// import * as commentService from "../../../services/comment";
// // import { createNewBlogSchema } from "../../../validation/validationSchema";

// interface ICommentProps {
//   localpostDetails: any;
// }

// interface ICommentState {
//   localpostDetails: any;
// }

// // interface IPostList {
// //   postInfo: IPostDetails;
// //   toggleEditMode: () => void;
// // }

// // interface ICreateNewBlogValues {
// //   title: string;
// //   description: string;
// // }

// interface ICreateNewCommentValues {
//   newComment: string;
// }

// class Comments extends React.Component<ICommentProps, ICommentState> {
//   constructor(props: Readonly<ICommentProps>) {
//     super(props);
//     this.state = {
//       localpostDetails: props.localpostDetails
//     };
//   }

//   //   componentDidUpdate(prevProps: IBlogListProps) {
//   //     if (prevProps !== this.props) {
//   //       this.setState({
//   //         localpostDetails: this.props.currentPostDetails
//   //       });
//   //     }
//   //   }

//   handleAddNewComment = async (values: any, id: string) => {
//     console.log(">>>>>>>>>>>>>>>>>aaaaaaaaaa>>>>>>.");
//     debugger;

//     try {
//       await commentService.createNewComment(values, id);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   render() {
//     const { localpostDetails } = this.state;
//     console.log("localpostDetails", localpostDetails);
//     return (
//       <div className="block">
//         <div className="block__content" />
//         <div className="tabs">
//           <div className="tabs__content">
//             <div className="tabs__content__pane active">
//               {/* {localpostDetails.comments &&
//               localpostDetails.comments.length > 0 ? ( */}
//               <div className="Block-white Block-product">
//                 <Formik
//                   initialValues={{
//                     newComment: ""
//                   }}
//                   onSubmit={async (
//                     values: ICreateNewCommentValues,
//                     { setSubmitting }: FormikActions<ICreateNewCommentValues>
//                   ) => {
//                     console.log("values", values);
//                     this.handleAddNewComment(values, localpostDetails.id); // TODO: Get id from global state
//                   }}
//                   render={props => (
//                     <div className="form-section">
//                       <Form>
//                         <div className="form-group">
//                           <TextFieldWrapper
//                             inputTypeClassName="form-group__control"
//                             name="newComment"
//                             type="text"
//                             id="newComment"
//                             value={props.values.newComment || ""}
//                             label="NewComment"
//                             placeholder="NewComment"
//                             handleChange={props.handleChange}
//                             handleBlur={props.handleBlur}
//                           />
//                           {props.errors.newComment && (
//                             <div className="form-group__error">
//                               {props.errors.newComment}
//                             </div>
//                           )}
//                         </div>
//                         <button type="submit" className="btn btn--blue btn--lg">
//                           UPDATE
//                         </button>
//                       </Form>
//                     </div>
//                   )}
//                 />
//               </div>
//               {/* ) : (
//                 <div className="Block-white Block-product">
//                   <p>Add new comment</p>
//                 </div>
//               )} */}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = ({ postReducer }: any) => {
//   return {
//     currentPostDetails: postReducer.currentPostDetails
//   };
// };

// const mapDispatchToProps = (dispatch: any) => ({
//   saveCurrentPost: (description: INewComment) =>
//     dispatch(Actions.storeNewComment(description))
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Comments);
