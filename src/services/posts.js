import config from "../config";
import http from "../utils/http";
import store from "../store";
import actionTypes from "../constants";

const { api } = config;

/**
 * Fetch all posts.
 *
 * @return {Object}
 */
export async function fetchAllPosts() {
  const url = api.endpoints.posts;

  return await http.get(url);
}

/**
 * Create new blogpost.
 *
 * @return {Object}
 */
export async function createNewPost(data) {
  const url = api.endpoints.posts;

  const response = await http.post(url, data);
  store.dispatch({
    type: actionTypes.STORE_POSTS,
    payload: response.data
  });
}
