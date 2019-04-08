import config from "../config";
import http from "../utils/http";

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
  const url = `${api.endpoints.profile + "/" + id}`;

  return http.put(url, data);
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
