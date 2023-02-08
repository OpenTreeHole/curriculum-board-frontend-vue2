<template>
  <v-container class="ma-0 pa-0" fluid>
    <v-breadcrumbs style="background-color: #fbfbfd" class="pl-4">
      <v-skeleton-loader v-if="loading" type="heading" width="70%" height="40%" class="d-none d-sm-flex" />
      <v-skeleton-loader v-if="loading" type="heading" width="100%" height="20%" class="d-block d-sm-none" />
      <template v-if="!loading">
        <v-breadcrumbs-item class="text-h6 font-weight-black mx-2" to="/"><font-awesome-icon icon="fa-solid fa-chevron-left" /></v-breadcrumbs-item>
        <v-breadcrumbs-item class="text-h6 font-weight-black ml-0">&nbsp;{{ courseGroup.department }}</v-breadcrumbs-item>
        <v-breadcrumbs-divider class="text-h6 font-weight-black">/</v-breadcrumbs-divider>
        <v-breadcrumbs-item class="text-h6 font-weight-black">{{ courseGroup.name }}</v-breadcrumbs-item>
        <v-chip :key="v" v-for="v in credits" label class="subtitle-2 font-weight-bold ml-3 d-none d-sm-flex white--text" color="#FB8C00">{{ v }} 学分 </v-chip>
      </template>
    </v-breadcrumbs>
    <v-banner class="d-block d-sm-none" v-if="loading">
      <v-skeleton-loader type="text" width="20%" height="10%"></v-skeleton-loader>
    </v-banner>
    <v-banner class="d-block d-sm-none mt-0 pt-0" v-if="!loading">
      <v-chip :key="v" v-for="v in credits" label small class="subtitle-2 font-weight-bold ml-3 white--text" color="#FB8C00"
        >{{ v }}
        学分
      </v-chip>
    </v-banner>
    <!-- TODO pad页面以及表单 -->
    <!-- 电脑以及手机页面  -->
    <v-row>
      <v-col lg="3" cols="12" class="pb-0">
        <v-card class="pb-4" elevation="0">
          <v-card-title class="text-h6 font-weight-black pb-0 ml-1"> 评分</v-card-title>
          <v-skeleton-loader v-if="loading" type="paragraph" width="60%" class="ml-10 my-2"></v-skeleton-loader>
          <v-expansion-panels flat multiple class="py-0" v-if="!loading">
            <v-expansion-panel class="py-0 pb-2">
              <!-- 总体评分 -->
              <v-expansion-panel-header class="mt-0 py-0 subtitle-1 font-weight-bold secondary--text ml-1">
                全部学期 (共
                {{ courseGroup.courseList.flatMap((course) => course.reviewList || []).length }} 条)
              </v-expansion-panel-header>
              <v-expansion-panel-content class="py-0 pl-2" v-if="courseGroup.courseList.flatMap((course) => course.reviewList || []).length >= 3">
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">总体评分</span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear style="width: 90%" :value="allRank.overall" :color="rankColorOverall(allRank.overall)" striped></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">{{ allRank.overall }} ({{ rankWordOverall(allRank.overall) }})</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">课程内容</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear style="width: 90%" :value="allRank.content" color="blue"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">{{ rankWordContent(allRank.content) }}</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">工作量</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear style="width: 90%" :value="allRank.workload" color="blue"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">{{ rankWordWorkload(allRank.workload) }}</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">考核要求</span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear style="width: 90%" :value="allRank.assessment" color="blue"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">{{ rankWordAssessment(allRank.assessment) }}</v-col>
                </v-row>
              </v-expansion-panel-content>
              <v-expansion-panel-content class="py-0 ma-0 pl-2" v-else>
                <v-subheader class="my-n4 mb-n7"> 评分太少, 不具有参考性 </v-subheader>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- 学期评分 -->
            <v-expansion-panel class="py-0 mt-0 pb-2" v-for="(reviews, year) in Object.fromEntries(semesterReview().entries())" :key="year + reviews.toString()">
              <v-expansion-panel-header class="mt-0 py-0 subtitle-1 font-weight-bold secondary--text ml-1">{{ year }} (共 {{ reviews.length }} 条) </v-expansion-panel-header>
              <v-expansion-panel-content class="py-0 pl-2" v-if="reviews.length >= 3">
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">总体评分</span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear
                      :value="semesterRank(reviews).overall"
                      style="width: 90%"
                      :color="rankColorOverall(semesterRank(reviews).overall)"
                      striped
                    ></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">{{ semesterRank(reviews).overall }} ({{ rankWordOverall(semesterRank(reviews).overall) }})</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">课程风格</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear :value="semesterRank(reviews).content" style="width: 90%" color="blue"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">{{ rankWordContent(semesterRank(reviews).content) }}</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">工作量</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear :value="semesterRank(reviews).workload" style="width: 90%" color="blue"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption"> {{ rankWordWorkload(semesterRank(reviews).workload) }}</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">考核要求</span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear style="width: 90%" :value="semesterRank(reviews).assessment" color="blue"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">{{ rankWordAssessment(semesterRank(reviews).assessment) }}</v-col>
                </v-row>
              </v-expansion-panel-content>
              <v-expansion-panel-content class="py-0 ma-0 pl-2" v-else>
                <v-subheader class="my-n4 mb-n7"> 评分太少, 不具有参考性 </v-subheader>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-card-title class="text-h6 font-weight-black py-0 pt-1 ml-1">授课教师</v-card-title>
          <v-skeleton-loader v-if="loading" type="sentences" width="60%" class="ml-10 my-2"></v-skeleton-loader>
          <v-card-actions class="pt-1 pb-1" v-if="!loading">
            <v-chip-group class="ml-4" column mandatory v-model="teacherTag" @change="changeTeacherFilter" active-class="blue--text">
              <v-chip active-class="chosen--text" small v-for="(v, i) in teacherTags()" :key="i" :disabled="ifTeacherTagDisabled(v)">{{ v }}</v-chip>
            </v-chip-group>
          </v-card-actions>
          <v-card-title class="text-h6 font-weight-black py-0 ml-1">时间</v-card-title>
          <v-skeleton-loader v-if="loading" type="sentences" width="60%" class="ml-10 my-2"></v-skeleton-loader>
          <v-card-actions class="pt-1 mb-2" v-if="!loading">
            <v-chip-group class="ml-4" column mandatory v-model="timeTag" @change="changeTimeFilter" active-class="blue--text">
              <v-chip active-class="chosen--text" small v-for="(v, i) in timeTags()" :key="i" :disabled="ifTimeTagDisabled(v)">{{ v }}</v-chip>
            </v-chip-group>
          </v-card-actions>
          <v-divider />
        </v-card>
        <div style="text-align: center" class="mt-1 d-none d-sm-block">
          <v-btn @click="reviewSheet = true" :disabled="loading || posted" elevation="0">发布测评</v-btn>
        </div>
      </v-col>
      <v-col lg="9" class="mx-lg-0 mx-3">
        <v-skeleton-loader v-if="loading" type="heading" class="ml-2 my-lg-4 mb-5"></v-skeleton-loader>
        <div v-if="!loading" class="d-none d-sm-block mt-10">
          <v-row style="text-align: center" v-if="reviews.length === 0">
            <v-col class="text-h5 my-4 grey--text"> 暂时没有测评 </v-col>
          </v-row>
          <review-card v-for="(v, i) in reviews" :key="'review' + i" :review="v" @openEditForm="reviewSheet = true" class="mb-3"></review-card>
        </div>
        <div style="text-align: center" class="mb-4 d-block d-sm-none mt-0">
          <v-btn @click="reviewSheet = true" :disabled="loading || posted" elevation="0"> 发布测评</v-btn>
        </div>
        <v-card v-if="loading" class="pa-2 mb-3">
          <v-skeleton-loader type="article, actions" width="100%" class="my-2"></v-skeleton-loader>
        </v-card>
        <v-row class="d-flex align-center" v-if="loading">
          <v-col style="text-align: center">
            <v-progress-circular :size="60" color="primary" indeterminate class="d-none d-sm-inline-block mt-3"></v-progress-circular>
            <v-progress-circular :size="40" color="primary" indeterminate class="d-inline-block d-sm-none"></v-progress-circular>
          </v-col>
        </v-row>
        <div v-if="!loading" class="d-block d-sm-none">
          <v-row style="text-align: center" v-if="reviews.length === 0">
            <v-col class="text-h6 my-2 grey--text"> 暂时没有测评 </v-col>
          </v-row>
          <review-card v-for="(v, i) in reviews" :key="'reviewOnPhone' + i" :review="v" @openEditForm="reviewSheet = true" class="mb-5"></review-card>
        </div>
        <div class="my-8"></div>
      </v-col>
    </v-row>
    <review-form
      v-model="reviewSheet"
      :course-group="courseGroup"
      :review-title-filled="reviewTitle"
      :teacher-selected="teacherSelected"
      :course-id-selected="courseId"
      :time-selected="timeSelected"
      :review-content-posted="reviewContent"
      :rank-scored="rank"
      :teacher-list="teachersSelectList"
      :time-list="timeSelectList"
      :posted="posted"
      @post="posted = true"
    ></review-form>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { CourseGroup, ReviewWithCourse, TotalRank } from '@/models'
import * as api from '@/apis'
import ReviewCard from '@/components/ReviewCard.vue'
import ReviewForm from '@/components/ReviewForm.vue'
import { parseYearSemester } from '@/utils/course'
// import { match } from 'pinyin-pro'

export interface ItemList {
  title: string
  value: string
  disabled: boolean
}
export default Vue.extend({
  name: 'CurriculumPage',
  components: { ReviewCard, ReviewForm },
  props: ['groupId'],
  data: () => ({
    posted: false,
    RenderingEditor: false,
    loading: true,
    valid: true,
    snackbarContent: '',
    error: false,
    ErrorMessage: '',
    snackbar: false,
    reviewSheet: false,
    postingReviewLoading: false,
    reviewTitle: '',
    reviewContent: '',
    reviewTitleRules: [(v: string) => !!v || '评论标题不能为空', (v: string) => v.length <= 20 || '评论标题不能超过20字'],
    teacherTag: 0,
    timeTag: 0,
    courseId: '',
    disabledTeacherTag: [] as string[],
    disabledTimeTag: [] as string[],
    teachersSelectList: [] as ItemList[],
    timeSelectList: [] as ItemList[],
    rank: {
      overall: 0,
      content: 0,
      workload: 0,
      assessment: 0
    },
    teacherSelected: {} as ItemList | null,
    timeSelected: {} as ItemList | null,
    allRank: {
      overall: 0,
      content: 0,
      workload: 0,
      assessment: 0
    },
    reviewSheetPhone: false,
    courseGroup: null as CourseGroup | null,
    filters: {
      teacher: null as string | null,
      year: null as string | null,
      semester: null as number | null
    }
  }),
  computed: {
    credits(): number[] {
      let creditsSet = new Set<number>()
      this.courseGroup?.courseList.forEach((course) => creditsSet.add(course.credit))
      return [...creditsSet]
    },
    reviews(): ReviewWithCourse[] {
      return (
        this.courseGroup?.courseList
          .filter(
            (course) =>
              (this.filters.teacher == null || course.teachers == this.filters.teacher) &&
              (this.filters.year == null || course.year == this.filters.year) &&
              (this.filters.semester == null || course.semester == this.filters.semester)
          )
          .flatMap((course) => course.reviewList?.map((review) => new ReviewWithCourse(review, course)) || []) || []
      )
    }
  },
  methods: {
    ifTeacherTagDisabled(teacherTag: string): boolean {
      if (teacherTag === '所有') return false
      else if (this.timeTag === 0) {
        let noReview = true
        this.courseGroup?.courseList.forEach((course) => {
          if (course.teachers === teacherTag) {
            if (course.reviewList !== undefined && course.reviewList?.length > 0) noReview = false
          }
        })
        return noReview
      } else {
        let noMatch = true
        this.courseGroup?.courseList.forEach((course) => {
          if (this.timeTags()[this.timeTag] === parseYearSemester(course)) {
            if (course.teachers === teacherTag && course.reviewList !== undefined && course.reviewList?.length > 0) noMatch = false
          }
        })
        return noMatch
      }
    },
    ifTimeTagDisabled(timeTag: string): boolean {
      if (timeTag === '所有') return false
      else if (this.teacherTag === 0) {
        let noReview = true
        this.courseGroup?.courseList.forEach((course) => {
          if (timeTag === parseYearSemester(course)) {
            if (course.reviewList !== undefined && course.reviewList?.length > 0) noReview = false
          }
        })
        return noReview
      } else {
        let noMatch = true
        this.courseGroup?.courseList.forEach((course) => {
          if (this.teacherTags()[this.teacherTag] === course.teachers) {
            if (timeTag === parseYearSemester(course) && course.reviewList !== undefined && course.reviewList?.length > 0) noMatch = false
          }
        })
        return noMatch
      }
    },
    timeTags(): string[] {
      let timeSet = new Set<string>()
      for (const course of this.courseGroup?.courseList ?? []) {
        timeSet.add(parseYearSemester(course))
      }
      return ['所有', ...timeSet]
    },
    teacherTags(): string[] {
      let teachersSet = new Set<string>()
      for (const course of this.courseGroup?.courseList ?? []) {
        teachersSet.add(course.teachers)
      }
      return ['所有', ...teachersSet]
    },
    semesterReview(): Map<string, ReviewWithCourse[]> {
      let courses = this.reviewsCategorizedByYearSemester()
      for (let [key, value] of courses) {
        if (value.length == 0) {
          courses.delete(key)
        }
      }
      return courses
    },
    reviewsCategorizedByYearSemester(): Map<string, ReviewWithCourse[]> {
      let resultMap = new Map<string, ReviewWithCourse[]>()
      for (const course of this.courseGroup?.courseList || []) {
        const yearSemester = parseYearSemester(course)
        const reviews = course.reviewList?.map((review) => new ReviewWithCourse(review, course)) || []
        if (resultMap.has(yearSemester)) {
          resultMap.get(yearSemester)?.push(...reviews)
        } else {
          resultMap.set(yearSemester, reviews)
        }
      }
      return resultMap
    },
    changeTimeFilter() {
      if (this.timeTag === 0) {
        this.filters.year = null
        this.filters.semester = null
      } else {
        this.filters.year = this.timeTags()[this.timeTag].split('-')[0]
        let semester = this.timeTags()[this.timeTag].split('-')[2]
        if (semester === '1') {
          this.filters.semester = 1
        } else if (semester === '寒假') {
          this.filters.semester = 2
        } else if (semester === '3') {
          this.filters.semester = 3
        } else if (semester === '暑假') {
          this.filters.semester = 4
        }
      }
    },
    changeTeacherFilter() {
      if (this.teacherTag === 0) {
        this.filters.teacher = null
      } else this.filters.teacher = this.teacherTags()[this.teacherTag]
    },
    rankColorOverall(overall: number): string {
      if (overall >= 75) {
        return 'green'
      } else if (overall >= 40) {
        return 'orange'
      } else {
        return 'red'
      }
    },
    rankWordAssessment(assessment: number): string {
      if (assessment < 20) {
        return '非常严格'
      } else if (assessment < 40) {
        return '严格'
      } else if (assessment < 60) {
        return '中等'
      } else if (assessment < 80) {
        return '宽松'
      } else {
        return '非常宽松'
      }
    },
    rankWordWorkload(workload: number): string {
      if (workload < 20) {
        return '非常小'
      } else if (workload < 40) {
        return '较小'
      } else if (workload < 60) {
        return '中等'
      } else if (workload < 80) {
        return '较大'
      } else {
        return '非常大'
      }
    },
    rankWordOverall(overall: number): string {
      if (overall < 10) {
        if ((this.courseGroup?.courseList.flatMap((course) => course.reviewList || []).length || 0) > 20) {
          return '差评如潮'
        } else return '特别差评'
      } else if (overall < 35) {
        return '多半差评'
      } else if (overall < 50) {
        return '褒贬不一'
      } else if (overall < 70) {
        return '多半好评'
      } else if (overall < 85) {
        return '好评'
      } else {
        if ((this.courseGroup?.courseList.flatMap((course) => course.reviewList || []).length || 0) > 20) {
          return '好评如潮'
        } else return '特别好评'
      }
    },
    rankWordContent(content: number): string {
      if (content < 20) {
        return '非常容易'
      } else if (content < 40) {
        return '容易'
      } else if (content < 60) {
        return '中等'
      } else if (content < 80) {
        return '较难'
      } else {
        return '硬核'
      }
    },
    semesterRank(reviews: ReviewWithCourse[]): TotalRank {
      const semesterTotalScore = new TotalRank({
        overall: 0,
        content: 0,
        workload: 0,
        assessment: 0
      })
      reviews.forEach((review) => {
        semesterTotalScore.overall += review.review.rank.overall
        semesterTotalScore.content += review.review.rank.content
        semesterTotalScore.workload += review.review.rank.workload
        semesterTotalScore.assessment += review.review.rank.assessment
      })
      semesterTotalScore.overall = Math.round((semesterTotalScore.overall / reviews.length) * 20.0)
      semesterTotalScore.content = Math.round((semesterTotalScore.content / reviews.length) * 20.0)
      semesterTotalScore.workload = Math.round((semesterTotalScore.workload / reviews.length) * 20.0)
      semesterTotalScore.assessment = Math.round((semesterTotalScore.assessment / reviews.length) * 20.0)
      return semesterTotalScore
    },
    // Get or load a course group with all reviews loaded.
    async getOrLoadCourseGroup(groupId: number): Promise<CourseGroup | null> {
      const loadReviews = async (courseGroup: CourseGroup) => {
        if (courseGroup.courseList.some((course) => !course.reviewList)) {
          const groupWithAllReviews = await api.getCourseGroup(groupId)
          this.$store.commit('addCourseGroup', { newCourseGroup: groupWithAllReviews })
          return groupWithAllReviews
        }
        return courseGroup
      }
      const getCourseGroup = async (groupId: number): Promise<CourseGroup | null> => {
        const groups = this.$store.state.data.courseGroup as CourseGroup[]
        const foundGroup = groups.find((group) => group.id == groupId)
        // console.log(foundGroup)
        if (foundGroup) return await loadReviews(foundGroup)
        return null
      }

      const result = await getCourseGroup(groupId)
      if (result) return result
      else {
        this.$store.commit('addCourseGroup', { newCourseGroup: await api.getCourseGroup(groupId) })
        return getCourseGroup(groupId)
      }
    }
  },
  async mounted() {
    this.courseGroup = await this.getOrLoadCourseGroup(this.groupId)
    this.allRank = this.$store.getters.calculateCourseOverallRank(this.groupId)
    let timeSet = new Set<string>()
    let teachersSet = new Set<string>()
    this.courseGroup?.courseList.forEach((course) => {
      timeSet.add(parseYearSemester(course))
    })
    this.courseGroup?.courseList.forEach((course) => {
      teachersSet.add(course.teachers)
    })
    let timeArray = [...timeSet] as string[]
    let teachersArray = [...teachersSet] as string[]
    timeArray.forEach((time) => {
      this.timeSelectList.push({ title: time, value: time, disabled: false })
    })
    teachersArray.forEach((teacher) => {
      this.teachersSelectList.push({ title: teacher, value: teacher, disabled: false })
    })
    this.courseId = this.courseGroup?.courseList[0].code ?? ''
    this.reviews.forEach((review) => {
      if (review.review.isMe) {
        this.posted = true
        this.reviewTitle = review.review.title
        this.reviewContent = review.review.content
        this.rank = review.review.rank
        this.teacherSelected!.title = review.course.teachers
        this.teacherSelected!.value = review.course.teachers
        this.teacherSelected!.disabled = false
        this.timeSelected!.title = parseYearSemester(review.course)
        this.timeSelected!.value = parseYearSemester(review.course)
        this.timeSelected!.disabled = false
        this.courseId = review.course.code
        if (this.timeSelected !== null && this.teacherSelected !== (null as ItemList | null)) {
          this.courseGroup?.courseList.find((course) => {
            if (course.teachers === this.teacherSelected?.title && parseYearSemester(course) === this.timeSelected?.title) {
              this.courseId = course.codeId
            }
          })
        } else this.courseId = this.courseGroup?.courseList[0].code ?? ''
      }
    })
    this.loading = false
  }
})
</script>

<style scoped></style>
