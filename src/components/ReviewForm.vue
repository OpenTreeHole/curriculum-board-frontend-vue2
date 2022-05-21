<template>
  <v-dialog
    v-bind:value="value"
    max-width="50%"
    :fullscreen="this.$vuetify.breakpoint.xsOnly"
    :transition="this.$vuetify.breakpoint.xsOnly ? 'dialog-bottom-transition' : 'dialog-transition'"
  >
    <v-card class="pa-4 ma-0 d-none d-sm-block">
      <v-card-title>
        <span class="text-h6 mb-3">发布测评</span>
      </v-card-title>
      <v-form class="mx-7" v-model="valid" ref="reviewSheet">
        <v-row>
          <v-col cols="8">
            <v-text-field :counter="20" required label="标题" class="pt-1 font-weight-bold" v-model="reviewTitle" :rules="reviewTitleRules"></v-text-field>
          </v-col>
        </v-row>
        <!-- TODO select宽度 -->
        <v-row class="pt-0 mt-0 pl-3 mb-2 pr-7">
          <v-select
            :items="teachersList"
            item-text="title"
            item-value="value"
            :disabled="reviewPosted"
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
            :disabled="reviewPosted"
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
          <v-text-field required readonly :disabled="reviewPosted" class="subtitle-2 font-weight-regular" v-model="courseIdSelect" style="width: min-content"></v-text-field>
        </v-row>
        <div ref="editor" class="d-block"></div>
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
        <v-btn color="blue darken-1" text @click="closeForm"> 取消</v-btn>
        <v-btn color="blue darken-1" text @click="postReview" :disabled="!valid" :loading="postingReviewLoading"> 发布</v-btn>
      </v-card-actions>
    </v-card>
    <!-- 手机表单布局-->
    <v-card class="d-sm-none">
      <v-card-title>
        <span class="text-h6 mt-5">发布测评</span>
      </v-card-title>
      <v-form class="mx-10" v-model="valid" ref="reviewSheet">
        <v-row class="mt-0">
          <v-col cols="12">
            <v-text-field :counter="20" required label="标题" class="pt-1 font-weight-bold" style="font-size: small" v-model="reviewTitle" :rules="reviewTitleRules"></v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-select
            :items="teachersList"
            item-text="title"
            item-value="value"
            :disabled="reviewPosted"
            required
            label="任课教师"
            :rules="[(v) => !!v || '请选择任课教师']"
            class="font-weight-regular mx-3"
            style="width: min-content; font-size: small"
            @change="banTime"
            v-model="teacherSelect"
            return-object
          ></v-select>
          <v-select
            :items="timesList"
            :disabled="reviewPosted"
            required
            item-text="title"
            item-value="value"
            label="课程时间"
            :rules="[(v) => !!v || '请选择课程时间']"
            class="font-weight-regular mx-3"
            style="width: min-content; font-size: small"
            @change="banTeachers"
            v-model="timeSelect"
            return-object
          ></v-select>
        </v-row>
        <v-row class="pa-0">
          <v-text-field
            label="课程编号"
            required
            readonly
            :disabled="reviewPosted"
            dense
            class="subtitle-2 font-weight-regular mx-3 mt-6 mb-2"
            v-model="courseIdSelect"
            style="width: max-content; font-size: small"
          ></v-text-field>
        </v-row>
        <div ref="phoneEditor" class="d-block"></div>
        <v-snackbar v-model="snackbar" :timeout="2000"
          >请输入{{ snackbarContent
          }}<template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
          </template></v-snackbar
        >
      </v-form>
      <v-card-title class="mb-0 mt-2"> 评分</v-card-title>
      <v-row class="mx-9">
        <v-col cols="12" class="d-flex pb-2">
          <span class="subtitle-1 mr-5">总体评分</span>
          <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.overall" :color="postRankColorOverall"></v-rating>
          <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">特别好评</span>
        </v-col>
      </v-row>
      <v-row class="mx-9 pt-0">
        <v-col cols="12" class="d-flex pt-0 pb-2">
          <span class="subtitle-1 mr-5">课程内容</span>
          <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.content" :color="postRankColorContent"></v-rating>
          <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">硬核</span>
        </v-col>
      </v-row>
      <v-row class="mx-9 pt-0">
        <v-col cols="12" class="d-flex pt-0 pb-2">
          <span class="subtitle-1 mr-9">工作量</span>
          <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.workload" :color="postRankColorWorkload"></v-rating>
          <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">轻松</span>
        </v-col>
      </v-row>
      <v-row class="mx-9 pt-0">
        <v-col cols="12" class="d-flex pt-0 pb-2">
          <span class="subtitle-1 mr-5">考核要求</span>
          <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.assessment" :color="postRankColorAssessment"></v-rating>
          <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">严格</span>
        </v-col>
      </v-row>
      <v-card-actions class="mr-4 mt-4">
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text v-on:click="$emit('input', $event.target.value)" class="mr-0">取消</v-btn>
        <v-btn color="blue darken-1" class="mr-2 ml-0" text :disabled="!valid" @click="postReview" :loading="postingReviewLoading">发布</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { Course, CourseGroup, PostReviewData, Review } from '@/models'
import { parseYearSemester } from '@/utils/course'
import { addReview, modifyReview } from '@/apis'
import { toNumber } from 'lodash-es'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

export interface ItemList {
  title: string
  value: string
  disabled: boolean
}

export default Vue.extend({
  name: 'ReviewForm',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    reviewTitleFilled: {
      type: String,
      default: () => ''
    },
    teacherSelected: {
      type: Object,
      default: () => {
        return null
      }
    },
    timeSelected: {
      type: Object,
      default: () => {
        return null
      }
    },
    courseIdSelected: {
      type: String,
      default: () => ''
    },
    reviewContentPosted: {
      type: String,
      default: () => ''
    },
    rankScored: {
      type: Object,
      default: () => ({
        overall: 0,
        content: 0,
        workload: 0,
        assessment: 0
      })
    },
    teacherList: {
      type: Array,
      default: () => []
    },
    timeList: {
      type: Array,
      default: () => []
    },
    courseGroup: {
      type: Object,
      default: null
    },
    posted: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // form items
      formDisplay: this.value as boolean,
      teachersList: this.teacherList as ItemList[],
      timesList: this.timeList as ItemList[],
      coursesList: this.courseGroup as CourseGroup,
      editor: null as Editor | null,
      // data for post review
      reviewTitle: this.reviewTitleFilled as string,
      teacherSelect: this.teacherSelected as ItemList,
      timeSelect: this.timeSelected as ItemList,
      courseIdSelect: this.courseIdSelected as string,
      reviewContent: this.reviewContentPosted as string,
      rank: this.rankScored,
      contentId: new Date().getTime().toString(),
      // form rules
      valid: true,
      snackbar: false,
      reviewPosted: false,
      snackbarContent: '',
      reviewTitleRules: [(v: string) => !!v || '评论标题不能为空', (v: string) => v.length <= 20 || '评论标题不能超过20字'],
      // form loading
      postingReviewLoading: false,
      editorInitialized: false
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
  watch: {
    value() {
      this.$nextTick(function () {
        if (this.value && !this.editorInitialized) {
          if (this.$vuetify.breakpoint.xsOnly) {
            this.editor = new Editor({
              el: this.$refs.phoneEditor! as HTMLElement,
              height: this.$vuetify.breakpoint.xsOnly ? '300px' : '500px',
              initialEditType: 'markdown',
              hideModeSwitch: true,
              previewHighlight: true
            })
          } else {
            this.editor = new Editor({
              el: this.$refs.editor! as HTMLElement,
              height: this.$vuetify.breakpoint.xsOnly ? '300px' : '500px',
              initialEditType: 'markdown',
              hideModeSwitch: true,
              previewHighlight: true
            })
          }
          if (this.reviewContent) {
            this.editor?.setMarkdown(this.reviewContent)
          }
          this.editorInitialized = true
        }
      })
    },
    courseIdSelected() {
      this.courseIdSelect = this.courseIdSelected as string
    },
    // lists
    courseGroup() {
      this.coursesList = this.courseGroup as CourseGroup
    },
    teachersList() {
      this.teachersList = this.teacherList as ItemList[]
    },
    timesList() {
      this.timesList = this.timeList as ItemList[]
    },
    // selected items
    teacherSelected() {
      this.teacherSelect = this.teacherSelected as ItemList
    },
    timeSelected() {
      this.timeSelect = this.timeSelected as ItemList
    },
    reviewTitleFilled() {
      this.reviewTitle = this.reviewTitleFilled as string
    },
    reviewContentPosted() {
      if (!this.reviewContent) {
        this.reviewContent = this.reviewContentPosted as string
        this.editor?.setMarkdown(this.reviewContent)
      }
    },
    rankScored() {
      this.rank = this.rankScored
    },
    posted() {
      this.reviewPosted = this.posted
    }
  },
  methods: {
    closeForm() {
      this.reviewContent = this.editor!.getMarkdown()
      this.$emit('input', false)
    },
    banTeachers(): void {
      if (this.timeSelect === (null as unknown as ItemList)) {
        for (const teacher of this.teachersList) {
          teacher.disabled = false
        }
      } else {
        this.teachersList.forEach((teacher: { disabled: boolean }) => {
          teacher.disabled = true
        })
        this.coursesList.courseList.forEach((course: Course) => {
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
        this.coursesList.courseList.find((course: Course) => {
          if (course.teachers === this.teacherSelect.title && parseYearSemester(course) === this.timeSelect.title) {
            this.courseIdSelect = course.codeId
          }
        })
      } else {
        this.courseIdSelect = this.coursesList?.courseList[0].code ?? ''
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
        this.coursesList.courseList.forEach((course: Course) => {
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
        this.coursesList.courseList.find((course) => {
          if (course.teachers === this.teacherSelect.title && parseYearSemester(course) === this.timeSelect.title) {
            this.courseIdSelect = course.codeId
          }
        })
      } else this.courseIdSelect = this.coursesList.courseList[0].code ?? ''
    },
    async postReview() {
      if ((this.$refs.reviewSheet as Vue & { validate: () => boolean }).validate()) {
        if (this.editor!.getMarkdown().trim().length >= 1) {
          if (this.rank.overall && this.rank.assessment && this.rank.content && this.rank.workload) {
            this.postingReviewLoading = true
            const review = {} as PostReviewData
            review.content = this.editor!.getMarkdown()
            review.rank = this.rank
            review.title = this.reviewTitle
            if (!this.posted) {
              let id = 0
              this.coursesList.courseList.forEach((course) => {
                if (course.codeId === this.courseIdSelect) {
                  id = course.id
                }
              })
              let [reviewAdded, error] = (await addReview(toNumber(id), review)
                .catch((error) => [null, error])
                .then((res) => [res, null])) as [Review, Error]
              if (error) {
                console.log(error)
                this.postingReviewLoading = false
              } else if (reviewAdded) {
                reviewAdded.isMe = true
                this.$store.commit('addReview', {
                  id: toNumber(id),
                  review: reviewAdded
                })
                this.formDisplay = false
                this.reviewPosted = true
                this.postingReviewLoading = false
                this.$emit('input', false)
              }
              this.postingReviewLoading = false
              // console.log(this.courseGroup)
            } else {
              let id = 0
              this.coursesList.courseList.forEach((course) => {
                course.reviewList?.forEach((review) => {
                  review.isMe = true
                  id = review.id
                })
              })
              let [reviewAdded, error] = (await modifyReview(toNumber(id), review)
                .catch((error) => [null, error])
                .then((res) => [res, null])) as [Review, Error]
              if (error) {
                console.log(error)
                this.postingReviewLoading = false
              } else if (reviewAdded) {
                reviewAdded.isMe = true
                this.$store.commit('modifyReview', {
                  id: toNumber(id),
                  review: reviewAdded
                })
                this.reviewContent = this.editor!.getMarkdown()
                this.$emit('input', false)
                this.reviewPosted = true
                this.postingReviewLoading = false
              }
              this.postingReviewLoading = false
            }
          } else {
            this.snackbarContent = '评分'
            this.snackbar = true
          }
        } else {
          this.snackbarContent = '测评内容'
          this.snackbar = true
        }
      }
    }
  },
  mounted() {
    console.log(this.contentId)
  }
})
</script>

<style scoped>
.CodeMirror-lines {
  font-size: 1.1rem;
}
</style>
