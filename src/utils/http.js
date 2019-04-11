import axios from "axios";

import configs from "../config";
import { getAccessToken, setAccessToken } from "../services/token";
import * as authService from "../services/auth";

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
// http.interceptors.response.use(
//   response => {
//     if (response && response.headers && response.headers.Authorization) {
//       setAccessToken(response.headers.Authorization);
//     }
//     return response;
//   },
//   async error => {
//     const statusCode = error.response.status;
//     if (statusCode === 401) {
//       const response = await authService.generateAccesstoken();
//     }

//     return Promise.reject(error);
//   }
// );

export default http;
