import { CourseGroup } from '@/models'
import { Module } from 'vuex'
import { RootState } from '@/store'
import { remove } from 'lodash-es'

export interface IDataModuleState {
  courseGroup: CourseGroup[]
}

const state: IDataModuleState = {
  courseGroup: []
}

const dataModule: Module<IDataModuleState, RootState> = {
  state: () => state,
  mutations: {
    addCourseGroup(state, { newCourseGroup }: { newCourseGroup: CourseGroup }) {
      state.courseGroup.push(newCourseGroup)
    },
    addCourseGroups(state, { newCourseGroups }: { newCourseGroups: CourseGroup[] }) {
      state.courseGroup.push(...newCourseGroups)
    },
    removeCourseGroups(state, { courseGroupId }: { courseGroupId: number }) {
      // According to the implementation of lodash.remove, this method should be able to trigger the reactive system of Vue.
      // But whether it can practically do this has not been tested.
      remove(state.courseGroup, (v) => v.id === courseGroupId)
    },
    removeAllCourseGroups(state) {
      state.courseGroup = []
    }
  }
}

export default dataModule
