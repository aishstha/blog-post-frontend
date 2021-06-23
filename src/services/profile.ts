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
  const url = api.endpoints.profile;

  return await http.get(url);
}

export async function updateUser(data: any, id: string) {
  const url = `${api.endpoints.profile}/${id}`;
  const response = await http.put(url, data);
  store.dispatch({
    type: actionTypes.STORE_PROFILE_INFORMATION,
    payload: response.data
  });
  return response;
}

/**
 *  Get user info by id.
 *
 * @param id String
 */
export async function getUserById(id: string) {
  const url = `${api.endpoints.profile + "/" + id}`;

  return await http.get(url);
}
