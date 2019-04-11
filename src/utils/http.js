import axios from "axios";

import configs from "../config";
import { getAccessToken } from "../services/token";

let http = axios.create({
  headers: {
    "Content-Type": "application/json"
  },
  baseURL: configs.baseURI
});

/**
 * HTTP request interceptor.
 */
http.interceptors.request.use(config => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

/**
 * HTTP response interceptor.
 */
http.interceptors.response.use(
  response => {
    // if (response && response.headers && response.headers.authorization) {
    //   tokenService.setAccessToken(response.headers.authorization);
    // }
    // console.log("response ", response);
    return response;
  },
  error => {
    // const statusCode = error.response.status;
    // const message = (error.response && error.response.data && error.response.data.message) || '';
    // 401.
    // backend requrest
    // /refreshtoken
    // response = accesstonk set in frontend

    // if (statusCode === HttpStatus.UNAUTHORIZED && message !== AUTHORIZATION.TOKEN_EXPIRE) {
    //   notify(messageStatus.ERROR, AUTHORIZATION.SESSION_OUT_MESSAGE);
    //   authService.logout();
    // } else if (statusCode === HttpStatus.UNAUTHORIZED && message === AUTHORIZATION.TOKEN_EXPIRE) {
    //   authService.logout();
    // } else if (statusCode === HttpStatus.UNPROCESSABLE_ENTITY && message === AUTHORIZATION.INVALID_TOKEN) {
    //   notify(messageStatus.ERROR, AUTHORIZATION.INVALID_TOKEN);
    //   authService.logout();
    // } else if (statusCode === HttpStatus.FORBIDDEN) {
    //   notify(messageStatus.ERROR, message);
    //   authService.logout();
    // }

    return Promise.reject(error);
  }
);

export default http;
