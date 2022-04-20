export class ReviewWithCourse {
  review: Review
  course: Course

  constructor(review: Review, course: Course) {
    this.review = review
    this.course = course
  }
}

export interface IReview extends IReviewData {
  id: number
  timeCreated: string
}

export interface IReviewData {
  title: string
  content: string
  rank: IRank
  remark: number
}
export interface IRank {
  overall: number
  content: number
  workload: number
  assessment: number
}
export interface ICourse extends ICourseData {
  id: number
  reviewList: IReview[] | undefined
}

export interface ICourseData {
  name: string
  code: string
  codeId: string
  credit: number
  department: string
  teachers: string
  maxStudent: number
  weekHour: number
  year: string
  semester: number
}

export interface ICourseGroup {
  id: number
  name: string
  code: string
  department: string
  courseList: ICourse[]
}

export class Review implements IReview {
  content: string
  id: number
  rank: IRank
  remark: number
  timeCreated: string
  title: string

  constructor(review: IReview) {
    this.content = review.content
    this.id = review.id
    this.rank = review.rank
    this.remark = review.remark
    this.timeCreated = review.timeCreated
    this.title = review.title
  }
}

export class Course implements ICourse {
  code: string
  codeId: string
  credit: number
  department: string
  id: number
  maxStudent: number
  name: string
  reviewList: Review[] | undefined
  semester: number
  teachers: string
  weekHour: number
  year: string

  constructor(course: ICourse) {
    this.code = course.code
    this.codeId = course.codeId
    this.credit = course.credit
    this.department = course.department
    this.id = course.id
    this.maxStudent = course.maxStudent
    this.name = course.name
    this.semester = course.semester
    this.teachers = course.teachers
    this.weekHour = course.weekHour
    this.year = course.year
    this.reviewList = course.reviewList?.map((v) => new Review(v))
  }
}

export class CourseGroup implements ICourseGroup {
  code: string
  courseList: Course[]
  department: string
  id: number
  name: string

  constructor(courseGroup: ICourseGroup) {
    this.code = courseGroup.code
    this.department = courseGroup.department
    this.id = courseGroup.id
    this.name = courseGroup.name
    this.courseList = courseGroup.courseList.map((v) => new Course(v))
  }
}
