import { CourseGroup, TotalRank } from '@/models'
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
        const totalScore = new TotalRank({
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
    cancelLikeReview(state, reviewPayload): void {
      state.courseGroup.forEach((courseGroup) => {
        courseGroup.courseList.forEach((course) => {
          if (course.reviewList) {
            course.reviewList.forEach((review) => {
              if (review.id == reviewPayload.reviewId) {
                review.remark--
              }
            })
          }
        })
      })
    },
    cancelUnlikeReview(state, reviewPayload): void {
      state.courseGroup.forEach((courseGroup) => {
        courseGroup.courseList.forEach((course) => {
          if (course.reviewList) {
            course.reviewList.forEach((review) => {
              if (review.id == reviewPayload.reviewId) {
                review.remark++
              }
            })
          }
        })
      })
    },
    likeReview(state, reviewPayload): void {
      state.courseGroup.forEach((courseGroup) => {
        courseGroup.courseList.forEach((course) => {
          if (course.reviewList) {
            course.reviewList.forEach((review) => {
              if (review.id == reviewPayload.reviewId) {
                review.remark++
              }
            })
          }
        })
      })
    },
    unlikeReview(state, reviewPayload): void {
      state.courseGroup.forEach((courseGroup) => {
        courseGroup.courseList.forEach((course) => {
          if (course.reviewList) {
            course.reviewList.forEach((review) => {
              if (review.id == reviewPayload.reviewId) {
                review.remark--
              }
            })
          }
        })
      })
    },
    addReview(state, reviewPayload): void {
      state.courseGroup.forEach((courseGroup) => {
        courseGroup.courseList.forEach((course) => {
          if (course.id == reviewPayload.id) {
            course.reviewList?.push(reviewPayload.review)
          }
        })
      })
    },
    modifyReview(state, reviewPayload): void {
      state.courseGroup.forEach((courseGroup) => {
        courseGroup.courseList.forEach((course) => {
          course.reviewList?.forEach((review) => {
            if (review.id == reviewPayload.id) {
              review.rank = reviewPayload.review.rank
              review.content = reviewPayload.review.content
              review.title = reviewPayload.review.title
            }
          })
        })
      })
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
