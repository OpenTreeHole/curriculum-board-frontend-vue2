import Dexie, { Table } from 'dexie'
import { ICourseGroup } from '@/models'

export interface CourseGroupModel {
  id: number
  index: string[]
  courseGroup: ICourseGroup
}

export class CourseGroupDexie extends Dexie {
  courseGroupTable!: Table<CourseGroupModel>

  constructor() {
    super('courseGroups')
    this.version(1).stores({
      courseGroupTable: '&id, *index, courseGroups'
    })
  }
}

const db = new CourseGroupDexie()
export const courseGroupTable = db.courseGroupTable
