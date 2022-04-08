import axios from 'axios'
import { backendAPI } from '@/config'

axios.defaults.baseURL = backendAPI
axios.interceptors.request.use((config) => {
  // Put token into header.
  const token = localStorage.getItem('token')
  if (process.env.NODE_ENV == 'development') {
    // Put your test token here!
  }

  if (token && config.headers) config.headers.Authorization = token
  return config
})

export default axios
