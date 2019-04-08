import config from "../config";
import http from "../utils/http";
import { IClientId } from "../interface";

const { api } = config;

/**
 * Post client id.
 *
 * @return {Object}
 */
export async function saveClientId(data: IClientId) {
  const url = api.endpoints.login;

  return await http.post(url, data);
}
