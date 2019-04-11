import actionTypes from "../constants";
import { INewComment } from "src/interface";

const storeNewComment = (description: INewComment) => ({
  type: actionTypes.STORE_NEW_COMMENT,
  payload: description
});

export const Actions = {
  storeNewComment
};
