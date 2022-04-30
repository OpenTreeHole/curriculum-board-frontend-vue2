const config = {
  backendAPI: import.meta.env.NODE_ENV !== 'production' ? 'https://testcb.fduhole.com/' : '/api/',
  authUrl: import.meta.env.VITE_AUTH_URL,
  authBaseUrl: import.meta.env.VITE_AUTH_BASE_URL,
  cookieDomain: import.meta.env.VITE_COOKIE_DOMAIN
}

console.log(config)

export default config
