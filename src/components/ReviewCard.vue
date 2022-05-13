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
                <v-col :class="reviewRemarkClass" style="font-size: 20px; text-align: center">
                  {{ this.remark }}
                </v-col>
              </v-row>
              <v-row style="font-size: 40px" class="mt-0 pt-1 grey--text flex-column">
                <font-awesome-icon :class="this.unlike ? 'red--text' : 'grey--text'" icon="fa-solid fa-caret-down" @click="downVote" />
              </v-row>
              <v-row class="pa-0">
                <v-card-text class="py-0 pb-1 grey--text d-none d-sm-block" style="font-size: 11px; text-align: center">{{ review.review.timeCreated }} </v-card-text>
              </v-row>
              <v-row class="pa-0 my-0 mt-1">
                <v-card-text class="caption grey--text pb-0 d-flex justify-end pr-3 pt-lg-1 pt-md-3 pt-sm-3 align-content-end align-end pt-1">
                  <v-chip x-small label style="margin-top: 1px; margin-right: 10px" v-if="false" class="mb-1 d-block"> 已编辑 </v-chip>
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
                  <v-btn v-if="review.review.isMe" class="d-none d-sm-flex mx-auto" text x-small color="grey" @click="editForm">
                    <v-icon small style="padding-right: 2px">mdi-pencil</v-icon>
                  </v-btn>
                  <v-card-text v-else class="py-0 py-0 grey--text d-none d-sm-block" style="font-size: 11px; text-align: center">user{{ review.review.reviewerId }} </v-card-text>
                </v-card-text>
              </v-row>
              <v-row class="pa-0 my-0 mt-0">
                <v-card-text class="caption grey--text pb-0 d-flex justify-end pr-3 py-1 align-content-end align-end d-none d-sm-block">
                  <v-btn v-if="review.review.isMe" class="d-block d-sm-none mx-auto" @click="editPhoneForm" text x-small color="grey">
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
                  <v-progress-linear
                    :value="review.review.rank.overall * 20"
                    :buffer-value="review.review.rank.overall * 20"
                    color="#5C6BC0"
                    height="10"
                    class="d-inline-flex ml-1"
                    style="width: 60%; padding-top: 2px"
                  />
                </div>
                <div class="d-block">
                  <span class="d-inline-flex" style="color: #3f51b5"> 内容 </span>
                  <v-progress-linear
                    :value="review.review.rank.content * 20"
                    :buffer-value="review.review.rank.content * 20"
                    color="#5C6BC0"
                    height="10"
                    class="d-inline-flex ml-4"
                    style="width: 60%; padding-top: 2px"
                  />
                </div>
                <div class="d-block">
                  <div class="d-block">
                    <span class="d-inline-flex" style="color: #3f51b5"> 工作量 </span>
                    <v-progress-linear
                      :value="review.review.rank.workload * 20"
                      :buffer-value="review.review.rank.workload * 20"
                      color="#5C6BC0"
                      height="10"
                      class="d-inline-flex ml-1"
                      style="width: 60%; padding-top: 2px"
                    />
                  </div>
                </div>
                <div class="d-block">
                  <div class="d-block">
                    <span class="d-inline-flex" style="color: #3f51b5"> 考核 </span>
                    <v-progress-linear
                      :value="review.review.rank.assessment * 20"
                      :buffer-value="review.review.rank.assessment * 20"
                      color="#5C6BC0"
                      height="10"
                      class="d-inline-flex ml-4"
                      style="width: 30%; padding-top: 2px"
                    />
                  </div>
                </div>
              </v-card-text>
            </v-col>
          </v-row>
          <v-row class="pa-lg-0 ma-lg-0 pa-md-0 ma-md-0 pa-sm-0 ma-sm-0 pa-4 pt-lg-0 pt-md-0 pt-sm-0 pt-6">
            <v-col class="pa-0 ma-0pt-0">
              <v-card-text class="red--text py-0 shrink" v-if="review.review.remark <= -5" style="font-size: x-small">* 此测评被多人反对, 请谨慎参考 </v-card-text>
              <v-card-text class="body-2 black--text pt-1 pb-2 px-2">
                {{ review.review.content }}
              </v-card-text>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row no-gutters style="background-color: rgba(0, 0, 0, 0.04)" class="d-flex align-content-space-between d-sm-none mt-1">
        <div class="shrink pr-0 d-flex" style="text-align: left">
          <v-card-text class="pa-1 pl-3 Caption grey--text">{{ review.review.timeCreated }}</v-card-text>
        </div>
        <div class="pr-2 ml-auto">
          <v-card-text class="pa-1 pl-0 caption">
            总评分
            <font-awesome-icon :class="rankColorOverall" :icon="rankIconOverall" /> &nbsp;内容 <font-awesome-icon :class="rankColorContent" :icon="rankIconContent" />&nbsp;工作量
            <font-awesome-icon :class="rankColorWorkload" :icon="rankIconWorkload" />&nbsp;考核
            <font-awesome-icon :class="rankColorAssessment" :icon="rankIconAssessment" />
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
    deleteReviewLoading: false,
    deleteCheck: false,
    remark: 0,
    like: false,
    unlike: false,
    rank: {
      overall: 4,
      content: 5,
      workload: 2,
      assessment: 3
    }
  }),
  computed: {
    reviewRemarkClass(): string {
      return this.remark < 0 ? 'ma-0 py-0 font-weight-regular red--text' : 'ma-0 py-0 font-weight-regular'
    },
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
  beforeMount() {
    this.remark = this.review.review.remark
  },
  methods: {
    deleteReview() {
      console.log('delete review')
    },
    async editForm(): Promise<void> {
      // console.log('openEditForm')
      this.$emit('openEditForm', this.review)
    },
    async editPhoneForm(): Promise<void> {
      this.$emit('openPhoneEditForm', this.review)
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
      } catch (e) {
        // Request failed, reverse to original status
        this.unlike = originalUnlike
        this.like = originalLike
        this.review.review.remark = originalRemark
      }
    }
  }
})
</script>

<style scoped></style>
