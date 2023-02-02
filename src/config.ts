let config = {
  backendAPI: 'https://danke.jingyijun.xyz:9443/api/',
  authUrl: 'https://auth.jingyijun.xyz:9443/api/',
  authBaseUrl: 'https://auth.jingyijun.xyz:9443/',
  cookieDomain: 'jingyijun.xyz',
  cdnUrl: '/api/'
}

if (import.meta.env) {
  config = {
    backendAPI: import.meta.env.VITE_BACKEND_API,
    authUrl: import.meta.env.VITE_AUTH_URL,
    authBaseUrl: import.meta.env.VITE_AUTH_BASE_URL,
    cookieDomain: import.meta.env.VITE_COOKIE_DOMAIN,
    cdnUrl: import.meta.env.VITE_CDN_URL
  }
}

// console.log(config)

export default config
