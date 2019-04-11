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
export async function createNewPost(data: any) {
  const url = api.endpoints.posts;

  const response = await http.post(url, data);
  store.dispatch({
    type: actionTypes.STORE_POSTS,
    payload: response.data
  });
}

/**
 * Fetch post by id.
 *
 * @return {Object}
 */
export async function fetchPostById(id: string) {
  const url = `${api.endpoints.posts + "/" + id}`;

  const response = await http.get(url);
  store.dispatch({
    type: actionTypes.STORE_CURRENT_POSTS,
    payload: response.data
  });

  return response.data;
}

export async function updatePostById(data: any, id: string) {
  const url = `${api.endpoints.posts + "/" + id}`;
  const response = await http.put(url, data);
  store.dispatch({
    type: actionTypes.STORE_CURRENT_POSTS,
    payload: response.data
  });
  return response;
}

/**
 * Fetch all posts.
 *
 * @return {Object}
 */
export async function fetchByQueryParams(searchKey: string) {
  const url = `${api.endpoints.posts + "?searchKey=" + searchKey}`;

  console.log("urlllllll",url);
  return await http.get(url);
}
