import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import config from '@/config'
import { isDebug } from '@/utils'
import JWTManager from '@/apis/jwt'
import router from '@/router'
import Cookies from 'js-cookie'

/**
 * Error caused by axios (or other api interaction)
 */
export class ApiError extends Error {
  originalError: AxiosError

  constructor(originalError: AxiosError, message?: string) {
    super(message)
    this.originalError = originalError
  }
}

export const authAxios = axios.create()
export const refreshAxios = axios.create()

export const jwt = new JWTManager()
jwt.needRefresh = (originalError) =>
  originalError.response?.status === 401 &&
  (originalError.response.data.exp || (originalError.response.data.message && (originalError.response.data.message as string).includes('Bearer')))
jwt.refreshErrorCallback = async (refreshError) => {
  if (
    refreshError.response?.status === 401 &&
    (refreshError.response.data.exp || (refreshError.response.data.message && (refreshError.response.data.message as string).includes('Bearer')))
  ) {
    Cookies.remove('access', { domain: config.cookieDomain })
    Cookies.remove('refresh', { domain: config.cookieDomain })
    if (router.currentRoute.name !== 'login') {
      await router.replace({
        name: 'login'
      })
      if (refreshError.response?.data.message) return Promise.reject(new ApiError(refreshError, `${refreshError.response.status}: ${refreshError.response.data.message}`))
      else return Promise.reject(new ApiError(refreshError, '会话已过期，请重新登录'))
    }
  }
}

const requestInterceptor = (config: AxiosRequestConfig) => {
  const token = Cookies.get('access')
  if (isDebug()) {
    // Put your test token here!
  }

  if (token && config.headers) config.headers.Authorization = token
  return config
}

const refreshRequestInterceptor = (config: AxiosRequestConfig) => {
  const token = Cookies.get('refresh')
  if (isDebug()) {
    // Put your test token here!
  }

  if (token && config.headers) config.headers.Authorization = token
  return config
}

const errorInterceptor = async (error: AxiosError) => {
  if (error.response) {
    if (error.response.data.message) {
      return Promise.reject(new ApiError(error, `${error.response.status}: ${error.response.data.message}`))
    } else {
      console.log('请点开以下错误（如果存在response与config字段则将其一并点开），并将错误信息截图')
      console.log({ error })
      return Promise.reject(new ApiError(error, `${error.response.status}: 未知错误，请按F12查看控制台以获得错误信息并发至站务分区`))
    }
  } else {
    console.log('请点开以下错误（如果存在response与config字段则将其一并点开），并将错误信息截图')
    console.log({ error })
    return Promise.reject(new ApiError(error, '未知axios错误，请按F12查看控制台以获得错误信息并发至站务分区，'))
  }
}

axios.interceptors.response.use((response) => response, jwt.responseErrorInterceptor)
authAxios.interceptors.response.use((response) => response, jwt.responseErrorInterceptor)

axios.defaults.baseURL = config.backendAPI
authAxios.defaults.baseURL = config.authUrl
refreshAxios.defaults.baseURL = config.authUrl
axios.interceptors.request.use(requestInterceptor)
authAxios.interceptors.request.use(requestInterceptor)
refreshAxios.interceptors.request.use(refreshRequestInterceptor)
axios.interceptors.response.use((response) => response, errorInterceptor)
authAxios.interceptors.response.use((response) => response, errorInterceptor)
refreshAxios.interceptors.response.use((response) => response, errorInterceptor)

export default axios
