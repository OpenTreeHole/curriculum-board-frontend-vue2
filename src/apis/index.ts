import { Course, CourseGroup, ICourse, ICourseData, ICourseGroup, IReview, IReviewData, PostReviewData, Review } from '@/models'
import axios, { authAxios, cdnAxios, jwt, refreshAxios } from '@/apis/axios'
import config from '@/config'
import { camelizeKeys, snakifyKeys } from '@/utils'
import { IPunishment, IUserAuth, IUserAuthData, Punishment, UserAuth } from '@/models/user'
import Cookies from 'js-cookie'
import { courseGroupTable } from '@/apis/database'
import { generateIndex, initializeTokenize } from '@/utils/tokenize'

jwt.refresh = async () => (await refresh()).access

export const login = async (email: string, password: string): Promise<{ message: string; access: string; refresh: string }> => {
  const response = await authAxios.post('/login', {
    email: email,
    password: password
  })
  Cookies.set('access', response.data.access, { domain: config.cookieDomain, expires: 10 })
  Cookies.set('refresh', response.data.refresh, { domain: config.cookieDomain, expires: 10 })
  return camelizeKeys(response.data)
}

export const logout = async (): Promise<{ message: string }> => {
  const response = await authAxios.get('/logout')
  return camelizeKeys(response.data)
}

export const refresh = async (): Promise<{ message: string; access: string; refresh: string }> => {
  const response = await refreshAxios.post('/refresh')
  Cookies.set('access', response.data.access, { domain: config.cookieDomain, expires: 10 })
  Cookies.set('refresh', response.data.refresh, { domain: config.cookieDomain, expires: 10 })
  return camelizeKeys(response.data)
}

export const verifyWithEmail = async (email: string): Promise<{ message: string; scope: string }> => {
  const response = await authAxios.get('/verify/email', {
    params: {
      email: email
    }
  })
  return camelizeKeys(response.data)
}

export const register = async (password: string, email: string, verification: string): Promise<{ message: string; access?: string; refresh?: string }> => {
  const response = await authAxios.post('/register', {
    password: password,
    email: email,
    verification: verification
  })
  Cookies.set('access', response.data.access, { domain: config.cookieDomain, expires: 10 })
  Cookies.set('refresh', response.data.refresh, { domain: config.cookieDomain, expires: 10 })
  return camelizeKeys(response.data)
}

export const changePassword = async (password: string, email: string, verification: string): Promise<{ message: string; access?: string; refresh?: string }> => {
  const response = await authAxios.put('/register', {
    password: password,
    email: email,
    verification: verification
  })
  Cookies.set('access', response.data.access, { domain: config.cookieDomain, expires: 10 })
  Cookies.set('refresh', response.data.refresh, { domain: config.cookieDomain, expires: 10 })
  return camelizeKeys(response.data)
}

export const listPunishmentsByUser = async (userId: number) => {
  const response = await authAxios.get(`/users/${userId}/punishments`)
  const data: IPunishment[] = camelizeKeys(response.data)
  return data.map((v) => new Punishment(v))
}

export const addPunishment = async (userId: number, reason: string, days: number, scope: string) => {
  const response = await authAxios.post(`/users/${userId}/punishments`, {
    reason: reason,
    days: days,
    scope: scope
  })
  return new Punishment(camelizeKeys(response.data))
}

export const getPunishmentByUser = async (userId: number, id: number) => {
  const response = await authAxios.get(`/users/${userId}/punishments/${id}`)
  return new Punishment(camelizeKeys(response.data))
}

export const getPunishmentById = async (id: number) => {
  const response = await authAxios.get(`/punishments/${id}`)
  return new Punishment(camelizeKeys(response.data))
}

export const listPunishments = async (size: number, offset: number) => {
  const response = await authAxios.get('/punishments', {
    params: {
      size: size,
      offset: offset
    }
  })
  const data: IPunishment[] = camelizeKeys(response.data)
  return data.map((v) => new Punishment(v))
}

export const getCurrentUser = async () => {
  const response = await authAxios.get('/users/me')
  return new UserAuth(camelizeKeys(response.data))
}

export const deleteUser = async (password: string) => {
  await authAxios.delete('/users/me', {
    data: {
      password: password
    }
  })
}

export const getUserById = async (userId: number) => {
  const response = await authAxios.get(`/users/${userId}`)
  return new UserAuth(camelizeKeys(response.data))
}

export const modifyUser = async (userId: number, userData: IUserAuthData) => {
  const response = await authAxios.put(`/users/${userId}`, snakifyKeys(userData))
  return new UserAuth(camelizeKeys(response.data))
}

export const listUsers = async (size: number, offset: number) => {
  const response = await authAxios.get('/users', {
    params: {
      size: size,
      offset: offset
    }
  })
  const data: IUserAuth[] = camelizeKeys(response.data)
  return data.map((v) => new UserAuth(v))
}

// Following is Curriculum-related api.

export const addCourse = async (courseData: ICourseData) => {
  const response = await axios.post('/courses', courseData)
  const data: ICourse = camelizeKeys(response.data)
  return new Course(data)
}

export const getCourseGroupHash = async () => {
  const response = await axios.get('/courses/hash')
  const { hash }: { hash: string } = camelizeKeys(response.data)
  return hash
}

export const fetchCourseGroups = async (progress: (text: string, progress: number) => void = () => {}) => {
  const hash = await getCourseGroupHash()
  if (localStorage.getItem('courseGroups') !== hash) {
    progress('Downloading course data...', 0)
    const response = await cdnAxios.get('/courses')

    progress('Camelizing course data...', 10)
    const data: ICourseGroup[] = camelizeKeys(response.data)

    progress('Initializing token...', 20)
    await initializeTokenize()

    progress('Mapping data...', 50)
    const datum = data.map((courseGroup) => ({
      id: courseGroup.id,
      index: [...generateIndex(courseGroup.name), courseGroup.code],
      courseGroup
    }))

    progress('Storing data...', 70)
    await courseGroupTable.bulkPut(datum)
    localStorage.setItem('courseGroups', hash)
  }

  progress('All set!', 100)
}

export const getCourseGroup = async (groupId: number) => {
  const response = await axios.get(`/group/${groupId}`)
  const data: ICourseGroup = camelizeKeys(response.data)
  return new CourseGroup(data)
}

export const getCourse = async (courseId: number) => {
  const response = await axios.get(`/courses/${courseId}`)
  const data: ICourse = camelizeKeys(response.data)
  return new Course(data)
}

export const getReviews = async (courseId: number) => {
  const response = await axios.get(`/courses/${courseId}/reviews`)
  const data: IReview[] = camelizeKeys(response.data)
  return data.map((v) => new Review(v))
}

export const addReview = async (courseId: number, reviewData: PostReviewData) => {
  const response = await axios.post(`/courses/${courseId}/reviews`, reviewData)
  const data: IReview = camelizeKeys(response.data)
  return new Review(data)
}

export const removeReview = async (reviewId: number): Promise<string> => {
  const response = await axios.delete(`/reviews/${reviewId}`)
  return response.data
}

export const modifyReview = async (reviewId: number, reviewData: PostReviewData) => {
  const response = await axios.put(`/reviews/${reviewId}`, reviewData)
  const data: IReview = camelizeKeys(response.data)
  return new Review(data)
}

export const voteForReview = async (reviewId: number, upvote: boolean) => {
  const response = await axios.patch(`/reviews/${reviewId}`, {
    upvote
  })
  return new Review(camelizeKeys(response.data))
}

export const getCedict = async () => {
  return await cdnAxios.get('/static/cedict_ts.u8')
}

// jump to login page when return 401
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      window.location.href = config.authBaseUrl + 'login?url=' + location.origin
    }
    return Promise.reject(error)
  }
)
