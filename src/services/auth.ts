import config from "../config";
import http from "../utils/http";
// import store from "../store";
// import actionTypes from "../constants";

const { api } = config;

export async function generateAccesstoken(data: any, id: string) {
  const url = api.endpoints.refreshToken;
  const response = await http.post(url);
  //   store.dispatch({
  //     type: actionTypes.STORE_NEW_COMMENT,
  //     payload: response.data
  //   });
  return response;
}
