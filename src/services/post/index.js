import store from "src/store";
import http from "../../utils/http";
import config from "../../config";

const { api } = config;

/**
 * Fetch all posts.
 *
 * @return {Object}
 */
export async function fetchAllPosts() {
  const url = api.endpoints.users; // TODO: api.endpoints.advertisers;

  return await http.get(url);

  // store.dispatch({

  // })
}

export async function updateUser(data, id) {
  const url = `${api.endpoints.users + '/' + id}`;

  return http.put(url, data);
}