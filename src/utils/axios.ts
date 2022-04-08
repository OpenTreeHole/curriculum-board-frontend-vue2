import axios from 'axios'
import { backendAPI } from '@/config'
import { isDebug } from '@/utils/index'

axios.defaults.baseURL = backendAPI
axios.interceptors.request.use((config) => {
  // Put token into header.
  const token = localStorage.getItem('token')
  if (isDebug()) {
    // Put your test token here!
  }

  if (token && config.headers) config.headers.Authorization = token
  return config
})

export default axios
