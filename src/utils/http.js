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

export default http;
