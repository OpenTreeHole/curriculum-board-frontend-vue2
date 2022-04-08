import { Course, CourseGroup, ICourse, ICourseData, ICourseGroup, IReview, IReviewData, Review } from '@/models'
import axios from '@/utils/axios'
import { camelizeKeys } from '@/utils'
export const addCourse = async (courseData: ICourseData) => {
  const response = await axios.post('/courses', courseData)
  const data: ICourse = camelizeKeys(response.data)
  return new Course(data)
}

export const getCourseGroups = async () => {
  const response = await axios.get('/courses')
  const data: ICourseGroup[] = camelizeKeys(response.data)
  return data.map((v) => new CourseGroup(v))
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

export const addReview = async (courseId: number, reviewData: IReviewData) => {
  const response = await axios.post(`/courses/${courseId}/reviews`, reviewData)
  const data: IReview = camelizeKeys(response.data)
  return new Review(data)
}

export const removeReview = async (reviewId: number): Promise<string> => {
  const response = await axios.delete(`/reviews/${reviewId}`)
  return response.data
}

export const modifyReview = async (reviewId: number, reviewData: IReviewData) => {
  const response = await axios.put(`/reviews/${reviewId}`, reviewData)
  const data: IReview = camelizeKeys(response)
  return new Review(data)
}
