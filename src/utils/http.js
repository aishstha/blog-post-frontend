import axios from 'axios';

import config from '../config';
// import { getAccessToken } from '../services/token';

let http = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: config.baseURI
});

// /**
//  * HTTP request interceptor.
//  */
// http.interceptors.request.use(config => {
//   const accessToken = getAccessToken();

//   if (accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return config;
// });

export default http;
