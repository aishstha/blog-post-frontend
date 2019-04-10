import config from "../config";
import http from "../utils/http";
import store from "../store";
import actionTypes from "../constants";

const { api } = config;

export async function createNewComment(data: any, id: string) {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>.");
    const url = `${api.endpoints.posts + "/" + id+api.endpoints.comments}`;
    const response = await http.post(url, data);
    store.dispatch({
      type: actionTypes.STORE_NEW_COMMENT,
      payload: response.data
    });
    return response;
  }
