const config = {
  api: {
    endpoints: {
      profile: "/users",
      login: "/auth/login", 
      posts: "/posts",
      comments: "/comments",
      subComments:'/sub-comments',
      refreshToken:'/auth/refresh-token'
    }
  },
  baseURI: process.env.REACT_APP_API_BASE_URI,
  env: process.env.NODE_ENV,
  googleClientId: process.env.REACT_APP_GOOGLE_CLIENT_ID
};

export default config;
