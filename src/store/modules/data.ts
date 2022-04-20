import { CourseGroup, totalRank } from '@/models'
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
  getters: {
    calculateCourseOverallRank:
      (state: IDataModuleState) =>
      (courseGroupId: number): object => {
        let numOfReviews = 0
        const totalScore = new totalRank({
          overall: 0,
          content: 0,
          workload: 0,
          assessment: 0
        })
        const courseGroupIndex = state.courseGroup.findIndex((group) => group.id == courseGroupId)
        if (courseGroupIndex < 0) return totalScore
        else {
          state.courseGroup[courseGroupIndex].courseList.forEach((course) => {
            course.reviewList?.forEach((review) => {
              totalScore.overall += review.rank.overall
              totalScore.content += review.rank.content
              totalScore.workload += review.rank.workload
              totalScore.assessment += review.rank.assessment
              numOfReviews++
            })
          })
        }
        if (numOfReviews == 0) return totalScore
        else {
          totalScore.overall = Math.round((totalScore.overall / numOfReviews) * 20.0)
          totalScore.content = Math.round((totalScore.content / numOfReviews) * 20.0)
          totalScore.workload = Math.round((totalScore.workload / numOfReviews) * 20.0)
          totalScore.assessment = Math.round((totalScore.assessment / numOfReviews) * 20.0)
          return totalScore
        }
      }
  },
  mutations: {
    cancelLikeReview(state, { reviewId }): void {
      state.courseGroup.reduce((acc, courseGroup) => {
        courseGroup.courseList.reduce((acc, course) => {
          if (course.reviewList) {
            const reviewIndex = course.reviewList.findIndex((review) => review.id == reviewId)
            course.reviewList[reviewIndex].remark--
            return true
          }
          return acc
        }, false)
        return acc
      }, false)
    },
    cancelUnlikeReview(state, { reviewId }): void {
      state.courseGroup.reduce((acc, courseGroup) => {
        courseGroup.courseList.reduce((acc, course) => {
          if (course.reviewList) {
            const reviewIndex = course.reviewList.findIndex((review) => review.id == reviewId)
            course.reviewList[reviewIndex].remark++
            return true
          }
          return acc
        }, false)
        return acc
      }, false)
    },
    likeReview(state, { reviewId }): void {
      state.courseGroup.reduce((acc, courseGroup) => {
        courseGroup.courseList.reduce((acc, course) => {
          if (course.reviewList) {
            const reviewIndex = course.reviewList.findIndex((review) => review.id == reviewId)
            course.reviewList[reviewIndex].remark++
            return true
          }
          return acc
        }, false)
        return acc
      }, false)
    },
    unlikeReview(state, { reviewId }): void {
      state.courseGroup.reduce((acc, courseGroup) => {
        courseGroup.courseList.reduce((acc, course) => {
          if (course.reviewList) {
            const reviewIndex = course.reviewList.findIndex((review) => review.id == reviewId)
            course.reviewList[reviewIndex].remark--
            return true
          }
          return acc
        }, false)
        return acc
      }, false)
    },
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
