const config = {
  api: {
    endpoints: {
      profile: "/profile",
      login:"/login" //TODO Change this
    }
  },
  baseURI: process.env.REACT_APP_API_BASE_URI,
  env: process.env.NODE_ENV,
  googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID
};

export default config;
