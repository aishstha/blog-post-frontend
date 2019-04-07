const config = {
  api: {
    endpoints: {
      users: "/users"
    }
  },
  baseURI: process.env.REACT_APP_API_BASE_URI,
  env: process.env.NODE_ENV
};

export default config;
