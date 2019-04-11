import { RouteComponentProps } from "react-router-dom";
import { IPostDetails } from "./index";

export interface IBlogListState {
  localpostDetails: any;
  isLoading: boolean;
  isPostEditMode: boolean;
  isCommentEditMode: boolean;
  selectedComment: string;
  selectedSubCommentId: string;
}

export interface IPostList {
  postInfo: IPostDetails;
  togglePostEditMode: () => void;
  onPostDelete: (id: string) => void;
}

export interface IBlogPostEditFormProps {
  postInfo: IPostDetails;
  togglePostEditMode: () => void;
  handleSubmit: (value: ICreateNewBlogValues, id: string, isValid: any) => void;
  postId: string;
}

export interface ICreateNewBlogValues {
  title: string;
  description: string;
}

// interface ICreateNewCommentValues {
//   description: string;
// }

export interface IBlogListProps extends RouteComponentProps<{ id: string }> {
  currentPostDetails: IPostDetails;
  saveCurrentPost: (postDetails: IPostDetails) => void;
}

export interface ICommentViewProps {
  comment: any; //TODO CHANGE
}

export interface ICommentEditProps {
  comment: any; //TODO CHANGE
  handleCommentEdit: (id: string, values: any) => void;
  toggleCommentEditMode: (id: string) => void;
  resetComment: () => void;
}
