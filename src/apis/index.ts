import { Course, CourseGroup, ICourse, ICourseData, ICourseGroup, IReview, IReviewData, PostReviewData, Review } from '@/models'
import axios, { authAxios, jwt, refreshAxios } from '@/apis/axios'
import config from '@/config'
import { camelizeKeys, snakifyKeys } from '@/utils'
import { IPunishment, IUserAuth, IUserAuthData, Punishment, UserAuth } from '@/models/user'
import Cookies from 'js-cookie'
import { courseGroupTable } from '@/apis/database'

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

export const fetchCourseGroups = async () => {
  // eslint-disable-next-line no-constant-condition
  if (localStorage.getItem('courseGroups') === null) {
    const response = await axios.get('/courses')
    // const data: ICourseGroup[] = [
    //   {
    //     code: 'JXT114514',
    //     courseList: [
    //       {
    //         id: 1,
    //         codeId: 'JXT114514.01',
    //         code: 'JXT114514',
    //         department: '嘉心糖',
    //         teachers: '丁烷人',
    //         credit: 4,
    //         maxStudent: 114514,
    //         semester: 1,
    //         weekHour: 7,
    //         year: '2022',
    //         name: '嘉然今天吃七海nana7mi',
    //         reviewList: [
    //           {
    //             id: 1,
    //             timeCreated: '2022-04-09',
    //             timeUpdated: '2022-04-09',
    //             title: '绝世好课',
    //             content: '每个脆脆鲨都应该来听的必修课程每个脆脆鲨都应该来听的必修课程',
    //             reviewerId: 1,
    //             rank: {
    //               overall: 5,
    //               content: 4,
    //               workload: 3,
    //               assessment: 2
    //             },
    //             remark: 10,
    //             isMe: false
    //           },
    //           {
    //             id: 2,
    //             timeCreated: '2022-04-09',
    //             timeUpdated: '2022-04-09',
    //             title: 'A/414',
    //             content: '每个脆脆鲨都应该来听的必修课程',
    //             reviewerId: 2,
    //             rank: {
    //               overall: 4,
    //               content: 4,
    //               workload: 2,
    //               assessment: 2
    //             },
    //             remark: -110,
    //             isMe: false
    //           },
    //           {
    //             id: 3,
    //             timeCreated: '2022-04-09',
    //             timeUpdated: '2022-04-09',
    //             title: 'A/414',
    //             content: '每个脆脆鲨都应该来听的必修课程',
    //             reviewerId: 5,
    //             rank: {
    //               overall: 1,
    //               content: 2,
    //               workload: 1,
    //               assessment: 1
    //             },
    //             remark: 110,
    //             isMe: false
    //           }
    //         ]
    //       },
    //       {
    //         id: 2,
    //         codeId: 'JXT114514.02',
    //         code: 'JXT114514',
    //         department: '嘉心糖',
    //         teachers: '丙烷人',
    //         credit: 5,
    //         maxStudent: 114514,
    //         semester: 2,
    //         weekHour: 7,
    //         year: '2012',
    //         name: '嘉然今天吃七海nana7mi',
    //         reviewList: []
    //       },
    //       {
    //         id: 3,
    //         codeId: 'JXT114514.03',
    //         code: 'JXT114514',
    //         department: '嘉心糖',
    //         teachers: '向晚',
    //         credit: 6,
    //         maxStudent: 114514,
    //         semester: 2,
    //         weekHour: 7,
    //         year: '2023',
    //         name: '嘉然今天吃七海nana7mi',
    //         reviewList: [
    //           {
    //             id: 3,
    //             timeCreated: '2022-04-09',
    //             timeUpdated: '2022-04-09',
    //             title: '你们A/没有自己的测评网站吗',
    //             content: '每个脆脆鲨都应该来听的必修课程',
    //             reviewerId: 7,
    //             rank: {
    //               overall: 4,
    //               content: 4,
    //               workload: 2,
    //               assessment: 2
    //             },
    //             remark: -110,
    //             isMe: true
    //           }
    //         ]
    //       }
    //     ],
    //     department: '嘉心糖',
    //     id: 1,
    //     name: '嘉然今天吃七海nana7mi'
    //   }
    // ]
    // // await courseGroupsDB.bulkDocs(data.map((v) => ({ ...v, _id: v.id.toString() })))
    // await courseGroupsDB.search({
    //   fields: ['name'],
    //   build: true
    // })

    const data: ICourseGroup[] = camelizeKeys(response.data)

    await courseGroupTable.bulkPut(data.map((courseGroup) => ({ id: courseGroup.id, index: [courseGroup.name, courseGroup.code], courseGroup })))
    localStorage.setItem('courseGroups', 'exists')
  }
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
  return new Review(camelizeKeys(response))
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
