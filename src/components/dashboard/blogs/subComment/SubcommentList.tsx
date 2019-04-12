import * as React from "react";
import { connect } from "react-redux";

// import { Actions } from "../../../../actions/comment";
import { ICommentDetails } from "../../../../interface";
// import { Formik, Form, FormikActions } from "formik";
// import TextFieldWrapper from "../../inputComponents/TextFieldWrapper";

// import * as commentService from "../../../../services/comment";

interface ISubCommentProps {
  comment: ICommentDetails;
}

interface ISubCommentState {
  localSubCommentDetails: ICommentDetails;
  selectedSubComment: string;
}

class SubComment extends React.Component<ISubCommentProps, ISubCommentState> {
  constructor(props: Readonly<ISubCommentProps>) {
    super(props);
    this.state = {
      localSubCommentDetails: props.comment,
      selectedSubComment: ""
    };
  }

  componentDidUpdate(prevProps: ISubCommentProps) {
    if (prevProps !== this.props) {
      this.setState({
        localSubCommentDetails: this.props.comment
      });
    }
  }

  render() {
    const { localSubCommentDetails } = this.state;
    return (
      <React.Fragment>
        <div className="Block-white Block-product">
          {localSubCommentDetails.description}
          <span className="Batch Batch--red Batch--icon">
            {localSubCommentDetails.users.name}
          </span>
        </div>
      </React.Fragment>
    );
  }
}

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
)(SubComment);
