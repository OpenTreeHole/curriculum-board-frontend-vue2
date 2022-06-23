import Dexie, { Table } from 'dexie'
import { ICourseGroup } from '@/models'

export interface CourseGroupModel {
  id: number
  index: string[]
  courseGroup: ICourseGroup
}

export class CourseGroupDexie extends Dexie {
  courseGroupTable!: Table<CourseGroupModel>
  tokenText!: Table<{ text: string }>

  constructor() {
    super('courseGroups')
    this.version(1.4).stores({
      courseGroupTable: '&id, *index, courseGroups',
      tokenText: 'text'
    })
  }
}

const db = new CourseGroupDexie()
export const courseGroupTable = db.courseGroupTable
export const tokenText = db.tokenText
