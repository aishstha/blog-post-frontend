import config from "../config";
import http from "../utils/http";
import { IClientId } from "../interface";

const { api } = config;

/**
 * Post client id.
 *
 * @return {Object}
 */
export async function getTokens(data: IClientId) {
  const url = api.endpoints.login;

  const response = await http.post(url, data);
  console.log(">response???", response);
  return response;
}
