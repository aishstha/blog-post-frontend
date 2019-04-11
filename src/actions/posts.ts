import actionTypes from "../constants";
import { IPostDetails } from "src/interface";

const storePosts = (postDetails: Array<IPostDetails>) => ({
  type: actionTypes.STORE_POSTS,
  payload: postDetails
});

const storeCurrentPosts = (currentPostDetails: IPostDetails) => ({
  type: actionTypes.STORE_CURRENT_POSTS,
  payload: currentPostDetails
});

export const Actions = {
  storePosts,
  storeCurrentPosts
};
