import actionTypes from "../constants";
import { IPostDetails } from 'src/interface';

const storePosts = (postDetails: Array<IPostDetails>) => ({
  type: actionTypes.STORE_POSTS,
  payload: postDetails
});

export const Actions = {
  storePosts
};
