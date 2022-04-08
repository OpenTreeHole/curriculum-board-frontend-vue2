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
function addCourseGroupImpl(state: IDataModuleState, { newCourseGroup }: { newCourseGroup: CourseGroup }) {
  const oldIndex = state.courseGroup.findIndex((group) => group.id == newCourseGroup.id)
  if (oldIndex < 0) state.courseGroup.push(newCourseGroup)
  else state.courseGroup[oldIndex] = newCourseGroup
}
const dataModule: Module<IDataModuleState, RootState> = {
  state: () => state,
  mutations: {
    addCourseGroup: addCourseGroupImpl,
    addCourseGroups(state, { newCourseGroups }: { newCourseGroups: CourseGroup[] }) {
      newCourseGroups.forEach((element) => addCourseGroupImpl(state, { newCourseGroup: element }))
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
