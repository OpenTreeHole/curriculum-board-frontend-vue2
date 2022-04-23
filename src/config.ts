const config = {
  backendAPI:
    process.env.NODE_ENV !== "production"
      ? "https://holecb.hath.top/"
      : "/api/",
  authUrl: process.env.VUE_APP_AUTH_URL,
  authBaseUrl: process.env.VUE_APP_AUTH_BASE_URL,
  cookieDomain: process.env.VUE_APP_COOKIE_DOMAIN,
};

export default config;
