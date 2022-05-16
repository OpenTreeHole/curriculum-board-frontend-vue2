let config = {
  backendAPI: 'https://testcb.fduhole.com/',
  authUrl: 'https://testAuth.fduhole.com/api/',
  authBaseUrl: 'http://localhost:8080/',
  cookieDomain: 'localhost'
}

if (import.meta.env) {
  config = {
    backendAPI: import.meta.env.VITE_BACKEND_API,
    authUrl: import.meta.env.VITE_AUTH_URL,
    authBaseUrl: import.meta.env.VITE_AUTH_BASE_URL,
    cookieDomain: import.meta.env.VITE_COOKIE_DOMAIN
  }
}

// console.log(config)

export default config
