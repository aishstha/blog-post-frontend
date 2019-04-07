import actionTypes from "../constants";
import { IPostDetails } from 'src/interface';

/* 
Actions are objects with information of what happened and what needs to change
Action creators are actions wrapped in a function
*/



const storePosts = (postDetails: IPostDetails) => ({
  type: actionTypes.STORE_POSTS,
  payload: postDetails
});

export const Actions = {
  storePosts
};
