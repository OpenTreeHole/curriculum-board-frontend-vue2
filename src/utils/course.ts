import { Course } from '@/models'

export const parseYearSemester = (course: Course) => {
  return getYears(course).toString() + '-' + (getYears(course) + 1).toString() + '-' + course.semester
}

function getYears(course: Course): number {
  return parseInt(course.year)
}
