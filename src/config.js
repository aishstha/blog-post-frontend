const config = {
  api: {
    endpoints: {
      profile: "/profile"
    }
  },
  baseURI: process.env.REACT_APP_API_BASE_URI,
  env: process.env.NODE_ENV
};

export default config;
