import { RouteComponentProps } from "react-router-dom";

import { IPostDetails } from "./index";

export interface IBlogListState {
  localpostDetails: any;
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
  handleSubmit: (value: ICreateNewBlogValues, id: string) => void;
  postId: string;
}

export interface ICreateNewBlogValues {
  title: string;
  description: string;
}
export interface IBlogListProps extends RouteComponentProps<{ id: string }> {
  currentPostDetails: IPostDetails;
  saveCurrentPost: (postDetails: IPostDetails) => void;
}

export interface ICommentViewProps {
  comment: any;
}

export interface ICommentEditProps {
  comment: any;
  handleCommentEdit: (id: string, values: any) => void;
  toggleCommentEditMode: (id: string) => void;
  resetComment: () => void;
}
