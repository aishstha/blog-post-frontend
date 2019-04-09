import config from "../config";
import http from "../utils/http";
import store from "src/store";
import actionTypes from "src/constants";

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
