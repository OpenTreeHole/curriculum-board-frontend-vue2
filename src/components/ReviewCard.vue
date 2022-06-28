<template>
  <v-container class="pa-0 mb-6">
    <v-card elevation="0">
      <v-row no-gutters class="d-flex justify-space-between ml-1 align-start align-content-start">
        <v-col class="d-flex align-center justify-center pt-2 pt-lg-4 pt-md-4 pt-sm-4" cols="2" lg="1" md="1" sm="2">
          <v-card class="pa-0 ma-0 mx-7 d-block justify-space-between" flat>
            <div class="pl-0">
              <v-row style="font-size: 40px" class="mt-0 grey--text flex-column">
                <font-awesome-icon icon="fa-solid fa-caret-up" :class="this.like ? 'blue--text' : 'grey--text'" @click="upVote" />
              </v-row>
              <v-row class="mt-1 flex-column">
                <v-col :class="reviewRemarkClass()" style="font-size: 20px; text-align: center">
                  {{ review.review.remark }}
                </v-col>
              </v-row>
              <v-row style="font-size: 40px" class="mt-0 pt-1 grey--text flex-column pb-1">
                <font-awesome-icon :class="this.unlike ? 'red--text' : 'grey--text'" icon="fa-solid fa-caret-down" @click="downVote" />
              </v-row>
              <v-row class="pa-0">
                <v-card-text class="py-0 pb-1 grey--text d-none d-sm-block" style="font-size: 11px; text-align: center">{{ review.review.timeUpdated.slice(0, 10) }} </v-card-text>
              </v-row>
              <v-row class="pa-0 my-0 mt-1">
                <v-card-text class="caption grey--text pb-0 d-block justify-center pr-3 pt-lg-1 pt-md-3 pt-sm-3 align-content-end align-end pt-1">
                  <v-chip
                    x-small
                    label
                    disabled
                    style="margin-top: 1px; text-align: center"
                    v-if="review.review.timeUpdated.slice(1, 20) !== review.review.timeCreated.slice(1, 20)"
                    class="mb-1"
                    >已编辑</v-chip
                  >
                  <v-dialog v-model="deleteCheck" persistent max-width="290">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-if="isAuth" text x-small color="grey" class="align-content-end" v-bind="attrs" v-on="on">
                        <v-icon small style="padding-bottom: 0; padding-right: 2px">mdi-trash-can</v-icon>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h5"> 是否删除测评? </v-card-title>
                      <v-card-text class="pb-1"> 您不可以撤销此操作 </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="deleteCheck = false"> 取消 </v-btn>
                        <v-btn color="red darken-1" text @click="deleteReview" :loading="deleteReviewLoading"> 删除 </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-btn v-if="review.review.isMe" class="d-none d-sm-block mx-auto" text x-small color="grey" @click="editForm">
                    <v-icon small style="padding-right: 2px">mdi-pencil</v-icon>
                  </v-btn>
                  <v-card-text v-else class="py-0 py-0 grey--text d-none d-sm-block" style="font-size: 11px; text-align: center">user{{ review.review.reviewerId }} </v-card-text>
                </v-card-text>
              </v-row>
              <v-row class="pa-0 my-0 mt-0">
                <v-card-text class="caption grey--text pb-0 d-flex justify-end pr-3 py-1 align-content-end align-end d-none d-sm-block">
                  <v-btn v-if="review.review.isMe" class="d-block d-sm-none mx-auto" @click="editForm" text x-small color="grey">
                    <v-icon small style="padding-right: 2px">mdi-pencil</v-icon>
                  </v-btn>
                </v-card-text>
              </v-row>
            </div>
          </v-card>
        </v-col>
        <v-col class="pa-0 ma-0">
          <v-row class="pa-0">
            <v-col class="pa-0">
              <v-card-title class="text-h6 font-weight-bold pt-2 pb-0 pl-6"> {{ review.review.title }}</v-card-title>
              <v-row align="center" justify="start" class="ml-3 mt-0 pl-2 align-start align-content-start">
                <v-col class="shrink pr-0 pl-1 py-0 mt-0 mt-lg-2 mt-md-2 mt-sm-2">
                  <v-chip small label outlined color="accent" class="d-none d-sm-flex">{{ review.course.teachers }} </v-chip>
                  <v-chip x-small label outlined color="accent" class="s-flex d-sm-none">{{ review.course.teachers }} </v-chip>
                </v-col>
                <v-col class="shrink pr-0 pl-2 py-0 mt-0 mt-lg-2 mt-md-2 mt-sm-2">
                  <v-chip small label outlined color="#E91E63" class="d-none d-sm-flex">{{ years }}</v-chip>
                  <v-chip x-small label outlined color="#E91E63" class="s-flex d-sm-none">{{ years }}</v-chip>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="pa-0 ma-0 d-flex align-start pl-16 pt-1" cols="3">
              <v-card-text class="pa-1 pl-0 caption pt-2 grey--text d-sm-block align-end ml-auto d-none" style="height: 50%">
                <div class="d-block align-self-end">
                  <span class="d-inline-flex" style="color: #3f51b5"> 总评分 </span>
                  <span class="d-inline-flex ml-2" style="color: black"> {{ rankWordOverall(this.rank.overall) }} </span>
                </div>
                <div class="d-block">
                  <span class="d-inline-flex ml-3" style="color: #3f51b5"> 风格 </span>
                  <span class="d-inline-flex ml-2" style="color: black"> {{ rankWordContent(this.rank.content) }} </span>
                </div>
                <div class="d-block">
                  <div class="d-block">
                    <span class="d-inline-flex" style="color: #3f51b5"> 工作量 </span>
                    <span class="d-inline-flex ml-2" style="color: black"> {{ rankWordWorkload(this.rank.workload) }} </span>
                  </div>
                </div>
                <div class="d-block">
                  <div class="d-block">
                    <span class="d-inline-flex ml-3" style="color: #3f51b5"> 考核 </span>
                    <span class="d-inline-flex ml-2" style="color: black"> {{ rankWordAssessment(this.rank.assessment) }} </span>
                  </div>
                </div>
              </v-card-text>
            </v-col>
          </v-row>
          <v-row class="pa-lg-0 ma-lg-0 pa-md-0 ma-md-0 pa-sm-0 ma-sm-0 pa-4 pt-lg-0 pt-md-0 pt-sm-0 pt-5">
            <v-col class="pa-0 ma-0 pt-0">
              <div class="shrink pr-0 d-flex d-sm-none" style="text-align: left">
                <v-card-text class="pa-0 pl-2 caption grey--text">{{ review.review.timeUpdated.slice(0, 10) }}</v-card-text>
              </div>
              <v-card-text class="red--text py-0 shrink" v-if="review.review.remark <= -5" style="font-size: x-small">* 此测评被多人反对, 请谨慎参考 </v-card-text>
              <!-- md viewer -->
              <div class="md-viewer pl-3 pr-lg-8 pt-lg-3 pr-2 pt-0">
                <div :ref="'reviewContent' + review.review.id" />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters style="background-color: rgba(0, 0, 0, 0.04)" class="d-flex align-content-space-between d-sm-none mt-1">
        <div class="pr-2 ml-auto">
          <v-card-text class="pa-1 pl-0" style='font-size: x-small; color: #3f51b5'>
            总评分:
            <span class="d-inline-flex" style="color: black"> {{ rankWordOverall(this.rank.overall) }} </span> &nbsp;风格:<span class="d-inline-flex ml-1" style="color: black"> {{ rankWordContent(this.rank.content) }} </span>&nbsp;工作量
            <span class="d-inline-flex" style="color: black"> {{ rankWordWorkload(this.rank.workload) }} </span>&nbsp;考核:
            <span class="d-inline-flex" style="color: black"> {{ rankWordAssessment(this.rank.assessment) }} </span>
          </v-card-text>
        </div>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { ReviewWithCourse } from '@/models'
import { parseYearSemester } from '@/utils/course'
import { voteForReview } from '@/apis'
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import '@/style/markdown-theme.css'

export default Vue.extend({
  name: 'ReviewCard',
  props: {
    review: {
      type: ReviewWithCourse,
      required: true
    }
  },
  data: () => ({
    isAuth: false,
    viewer: null as Viewer | null,
    deleteReviewLoading: false,
    deleteCheck: false,
    remark: 0,
    like: false,
    unlike: false,
    rank: {
      overall: 0,
      content: 0,
      workload: 0,
      assessment: 0
    }
  }),
  computed: {
    rankColorOverall(): string {
      const rankColorOverall = ['red--text', 'black--text', 'grey--text', 'brown--text', 'orange--text']
      return rankColorOverall[this.review.review.rank.overall - 1]
    },
    rankColorContent(): string {
      const rankColorContent = ['red--text', 'black--text', 'grey--text', 'brown--text', 'orange--text']
      return rankColorContent[this.review.review.rank.content - 1]
    },
    rankColorWorkload(): string {
      const rankColorWorkload = ['red--text', 'black--text', 'grey--text', 'brown--text', 'orange--text']
      return rankColorWorkload[this.review.review.rank.workload - 1]
    },
    rankColorAssessment(): string {
      const rankColorAssessment = ['red--text', 'black--text', 'grey--text', 'brown--text', 'orange--text']
      return rankColorAssessment[this.review.review.rank.assessment - 1]
    },
    rankIconOverall(): string {
      const rankIconOverall = ['fa-solid fa-face-frown', 'fa-solid fa-face-meh', 'fa-solid fa-face-smile', 'fa-solid fa-face-laugh', 'fa-solid fa-face-grin-stars']
      return rankIconOverall[this.review.review.rank.overall - 1]
    },
    rankIconContent(): string {
      const rankIconContent = ['fa-solid fa-face-frown', 'fa-solid fa-face-meh', 'fa-solid fa-face-smile', 'fa-solid fa-face-laugh', 'fa-solid fa-face-grin-stars']
      return rankIconContent[this.review.review.rank.content - 1]
    },
    rankIconWorkload(): string {
      const rankIconWorkload = ['fa-solid fa-face-frown', 'fa-solid fa-face-meh', 'fa-solid fa-face-smile', 'fa-solid fa-face-laugh', 'fa-solid fa-face-grin-stars']
      return rankIconWorkload[this.review.review.rank.workload - 1]
    },
    rankIconAssessment(): string {
      const rankIconAssessment = ['fa-solid fa-face-frown', 'fa-solid fa-face-meh', 'fa-solid fa-face-smile', 'fa-solid fa-face-laugh', 'fa-solid fa-face-grin-stars']
      return rankIconAssessment[this.review.review.rank.assessment - 1]
    },
    years(): string {
      return parseYearSemester(this.review.course)
    }
  },
  watch: {
    'review.review.content'() {
      this.viewer!.setMarkdown(this.review.review.content)
    },
    'review.review.remark'() {
      this.remark = this.review.review.remark
    },
  },
  beforeMount() {
    this.remark = this.review.review.remark
    if (this.review.review.vote === 1) this.like = true
    else if (this.review.review.vote === -1) this.unlike = true
  },
  methods: {
    rankWordOverall(rankOverall: number): string {
      const rankWordOverall = ['无', '特别差评', '差评', '一般', '好评', '特别好评']
      return rankWordOverall[rankOverall]
    },
    rankWordContent(rankContent: number): string {
      const rankWordContent = ['无', '非常容易', '容易', '一般', '较难', '硬核']
      return rankWordContent[rankContent]
    },
    rankWordWorkload(rankWorkload: number): string {
      const rankWordWorkload = ['无', '非常小', '较小', '适中', '较大', '非常大']
      return rankWordWorkload[rankWorkload]
    },
    rankWordAssessment(rankAssessment: number): string {
      const rankWordAssessment = ['无', '非常严格', '严格', '适中', '宽松', '非常宽松']
      return rankWordAssessment[rankAssessment]
    },
    reviewRemarkClass(): string {
      return this.remark < 0 ? 'ma-0 py-0 font-weight-regular red--text' : 'ma-0 py-0 font-weight-regular'
    },
    deleteReview() {
      console.log('delete review')
    },
    editForm(): void {
      // console.log('openEditForm')
      this.$emit('openEditForm', this.review)
    },
    async upVote(): Promise<void> {
      // Record original status
      const originalUnlike = this.unlike
      const originalLike = this.like
      const originalRemark = this.review.review.remark

      // Compute status after vote
      this.review.review.remark += this.unlike ? 2 : this.like ? -1 : 1
      this.unlike = false
      this.like = !this.like
      try {
        const review = await voteForReview(this.review.review.id, true)
        this.review.review.remark = review.remark
        this.reviewRemarkClass()
      } catch (e) {
        // Request failed, reverse to original status
        this.unlike = originalUnlike
        this.like = originalLike
        this.review.review.remark = originalRemark
      }
    },
    async downVote(): Promise<void> {
      // Record original status
      const originalUnlike = this.unlike
      const originalLike = this.like
      const originalRemark = this.review.review.remark

      // Compute status after vote
      this.review.review.remark += this.like ? -2 : this.unlike ? 1 : -1
      this.like = false
      this.unlike = !this.like

      try {
        const review = await voteForReview(this.review.review.id, false)
        this.review.review.remark = review.remark
        this.reviewRemarkClass()
      } catch (e) {
        // Request failed, reverse to original status
        this.unlike = originalUnlike
        this.like = originalLike
        this.review.review.remark = originalRemark
      }
    }
  },
  mounted() {
    this.viewer = new Viewer({
      el: this.$refs['reviewContent' + this.review.review.id] as HTMLElement,
      initialValue: this.review.review.content
    })
    this.rank.overall = this.review.review.rank.overall
    this.rank.content = this.review.review.rank.content
    this.rank.workload = this.review.review.rank.workload
    this.rank.assessment = this.review.review.rank.assessment
  }
})
</script>

<style></style>
