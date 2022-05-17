<template>
  <v-dialog v-model="formDisplay" max-width="50%" class="d-none d-sm-flex">
    <v-card class="pa-4 ma-0">
      <v-card-title>
        <span class="text-h6 mb-3">发布测评</span>
      </v-card-title>
      <v-form class="mx-7" v-model="valid" ref="reviewSheet">
        <v-row>
          <v-col cols="8">
            <v-text-field :counter="20" required label="标题" class="pt-1 font-weight-bold" v-model="reviewTitle" :rules="reviewTitleRules"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="pt-0 mt-0 pl-3 mb-2 pr-7">
          <v-select
            :items="teachersList"
            item-text="title"
            item-value="value"
            clearable
            required
            label="任课教师"
            :rules="[(v) => !!v || '请选择任课教师']"
            class="font-weight-regular mr-2"
            style="width: min-content"
            @change="banTime"
            v-model="teacherSelect"
            return-object
          ></v-select>
          <v-select
            :items="timesList"
            clearable
            required
            item-text="title"
            item-value="value"
            label="课程时间"
            :rules="[(v) => !!v || '请选择课程时间']"
            class="font-weight-regular mr-2"
            style="width: min-content"
            @change="banTeachers"
            v-model="timeSelect"
            return-object
          ></v-select>
          <v-text-field required readonly class="subtitle-2 font-weight-regular" v-model="courseIdSelect" style="width: min-content"></v-text-field>
        </v-row>
        <ReviewEditor class="mt-2 mr-3" ref="reviewEditor" v-if="!RenderingEditor" />
        <v-snackbar v-model="snackbar" :timeout="2000">
          请输入{{ snackbarContent
          }}<template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
          </template>
        </v-snackbar>
      </v-form>
      <v-card-title class="mb-2 mt-2"> 评分</v-card-title>
      <v-row class="mx-3">
        <v-col cols="12" class="d-flex pb-2">
          <span class="subtitle-1 mr-5">总体评分</span>
          <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.overall" :color="postRankColorOverall"></v-rating>
          <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">{{ postRankWordOverall }}</span>
        </v-col>
      </v-row>
      <v-row class="mx-3 pt-0">
        <v-col cols="12" class="d-flex pt-0 pb-2">
          <span class="subtitle-1 mr-5">课程内容</span>
          <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.content" :color="postRankColorContent"></v-rating>
          <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">{{ postRankWordContent }}</span>
        </v-col>
      </v-row>
      <v-row class="mx-3 pt-0">
        <v-col cols="12" class="d-flex pt-0 pb-2">
          <span class="subtitle-1 mr-9">工作量</span>
          <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.workload" :color="postRankColorWorkload"></v-rating>
          <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">{{ postRankWordWorkload }}</span>
        </v-col>
      </v-row>
      <v-row class="mx-3 pt-0">
        <v-col cols="12" class="d-flex pt-0 pb-2">
          <span class="subtitle-1 mr-5">考核要求</span>
          <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.assessment" :color="postRankColorAssessment"></v-rating>
          <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">{{ postRankWordAssessment }}</span>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="reviewSheet = false"> 取消</v-btn>
        <v-btn color="blue darken-1" text @click="postReview" :disabled="!valid" :loading="postingReviewLoading"> 发布</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course, CourseGroup, PostReviewData, Review, ReviewWithCourse, TotalRank } from '@/models'
import { parseYearSemester } from '@/utils/course'

export interface ItemList {
  title: string
  value: string
  disabled: boolean
}

export default Vue.extend({
  name: 'ReviewForm',
  props() {
    return {
      value: {
        type: Boolean,
        default: false
      },
      reviewSheet: {
        type: Boolean,
        default: false
      },
      reviewTitleFilled: {
        type: String,
        default: ''
      },
      teacherSelected: {
        type: Object as unknown as ItemList,
        default: null as unknown as ItemList
      },
      timeSelected: {
        type: Object as unknown as ItemList,
        default: null as unknown as ItemList
      },
      courseIdSelected: {
        type: String,
        default: ''
      },
      rankScored: {
        type: TotalRank,
        default: {
          overall: 0,
          content: 0,
          workload: 0,
          assessment: 0
        }
      },
      teacherList: {
        type: Array as unknown as ItemList,
        default: [] as unknown as ItemList
      },
      timeList: {
        type: Array as unknown as ItemList,
        default: [] as unknown as ItemList
      },
      courseGroup: {
        type: CourseGroup,
        default: {} as CourseGroup
      }
    }
  },
  data() {
    return {
      // form items
      formDisplay: this.reviewSheet as boolean,
      teachersList: this.$props.teacherList as ItemList[],
      timesList: this.$props.timeList as ItemList[],
      courseList: this.$props.courseGroup as CourseGroup,
      // data for post review
      reviewTitle: this.$props.reviewTitleFilled as string,
      teacherSelect: this.$props.teacherSelected as ItemList,
      timeSelect: this.$props.timeSelected as ItemList,
      courseIdSelect: this.$props.courseIdSelected as string,
      rank: this.$props.rankScored as TotalRank,
      // form rules
      valid: true,
      snackbarContent: '',
      reviewTitleRules: [(v: string) => !!v || '评论标题不能为空', (v: string) => v.length <= 20 || '评论标题不能超过20字'],
      // form loading
      postingReviewLoading: false
    }
  },
  computed: {
    postRankWordOverall(): string {
      const rankWordOverall = ['无', '特别差评', '差评', '一般', '好评', '特别好评']
      return rankWordOverall[this.rank.overall]
    },
    postRankWordContent(): string {
      const rankWordContent = ['无', '非常容易', '容易', '一般', '较难', '硬核']
      return rankWordContent[this.rank.content]
    },
    postRankWordWorkload(): string {
      const rankWordWorkload = ['无', '非常大', '大', '适中', '小', '非常小']
      return rankWordWorkload[this.rank.workload]
    },
    postRankWordAssessment(): string {
      const rankWordAssessment = ['无', '非常严格', '严格', '适中', '宽松', '非常宽松']
      return rankWordAssessment[this.rank.assessment]
    },
    postRankColorOverall(): string {
      if (this.rank.overall >= 5) {
        return 'green'
      } else if (this.rank.overall >= 2) {
        return 'orange'
      } else {
        return 'red'
      }
    },
    postRankColorContent(): string {
      if (this.rank.content >= 5) {
        return 'green'
      } else if (this.rank.content >= 2) {
        return 'orange'
      } else {
        return 'red'
      }
    },
    postRankColorWorkload(): string {
      if (this.rank.workload >= 5) {
        return 'green'
      } else if (this.rank.workload >= 2) {
        return 'orange'
      } else {
        return 'red'
      }
    },
    postRankColorAssessment(): string {
      if (this.rank.assessment >= 5) {
        return 'green'
      } else if (this.rank.assessment >= 2) {
        return 'orange'
      } else {
        return 'red'
      }
    }
  },
  methods: {
    banTeachers(): void {
      if (this.timeSelect === (null as unknown as ItemList)) {
        for (const teacher of this.teachersList) {
          teacher.disabled = false
        }
      } else {
        this.teachersList.forEach((teacher: { disabled: boolean }) => {
          teacher.disabled = true
        })
        this.courseList.courseList.forEach((course: Course) => {
          if (this.timeSelect.title === parseYearSemester(course)) {
            for (const teacher of this.teachersList) {
              if (teacher.title === course.teachers) {
                teacher.disabled = false
              }
            }
          }
        })
      }
      if (this.teacherSelect !== (null as unknown as ItemList) && this.timeSelect !== (null as unknown as ItemList)) {
        this.courseList.courseList.find((course: Course) => {
          if (course.teachers === this.teacherSelect.title && parseYearSemester(course) === this.timeSelect.title) {
            this.courseIdSelect = course.codeId
          }
        })
      } else {
        this.courseIdSelect = this.courseList?.courseList[0].code ?? ''
      }
    },
    banTime(): void {
      if (this.teacherSelect === (null as unknown as ItemList)) {
        for (const time of this.timesList) {
          time.disabled = false
        }
      } else {
        this.timesList.forEach((time: { disabled: boolean }) => {
          time.disabled = true
        })
        this.courseList.courseList.forEach((course: Course) => {
          if (this.teacherSelect?.title === course.teachers) {
            for (const time of this.timesList) {
              if (time.title === parseYearSemester(course)) {
                time.disabled = false
              }
            }
          }
        })
      }
      if (this.timeSelect !== (null as unknown as ItemList) && this.teacherSelect !== (null as unknown as ItemList)) {
        this.courseList.courseList.find((course) => {
          if (course.teachers === this.teacherSelect.title && parseYearSemester(course) === this.timeSelect.title) {
            this.courseIdSelect = course.codeId
          }
        })
      } else this.courseIdSelect = this.courseList.courseList[0].code ?? ''
    }
  },
  mounted() {
    console.log(this.revi)
  }
})
</script>

<style scoped></style>
