import { Course } from '@/models'

export const parseYearSemester = (course: Course) => {
  let semester = ''
  switch (course.semester) {
    case 1:
      semester = '1'
      break
    case 2:
      semester = '寒假'
      break
    case 3:
      semester = '2'
      break
    case 4:
      semester = '暑假'
      break
  }
  return getYears(course).toString() + '-' + (getYears(course) + 1).toString() + '-' + semester
}

function getYears(course: Course): number {
  return parseInt(course.year)
}
