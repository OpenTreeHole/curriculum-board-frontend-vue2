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
                <v-card-text class="py-0 pb-1 grey--text d-none d-sm-block" style="font-size: x-small; text-align: center">{{ review.review.timeCreated }}</v-card-text>
              </v-row>
              <v-row class="pa-0 my-0 mt-1">
                <v-card-text class="caption grey--text pb-0 d-flex justify-end pr-3 pt-lg-3 pt-md-3 pt-sm-3 align-content-end align-end pt-1">
                  <v-chip x-small label style="margin-top: 1px; margin-right: 10px" v-if="false" class="mb-1 d-block">已编辑</v-chip>
                  <v-btn v-if="review.review.isMe" text x-small color="grey" class="align-content-end"
                    ><v-icon small style="padding-bottom: 0; padding-right: 2px">mdi-trash-can</v-icon></v-btn
                  ><v-btn v-if="review.review.isMe" class="px-0 d-none d-sm-flex" text x-small color="grey" @click="editForm">
                    <v-icon small style="padding-right: 2px">mdi-pencil</v-icon>
                  </v-btn>
                </v-card-text>
              </v-row>
              <v-row class="pa-0 my-0 mt-0">
                <v-card-text class="caption grey--text pb-0 d-flex justify-end pr-3 py-1 align-content-end align-end d-none d-sm-block">
                  <v-btn v-if="review.review.isMe" class="d-block d-sm-none" @click="editPhoneForm" text x-small color="grey"
                    ><v-icon small style="padding-right: 2px">mdi-pencil</v-icon></v-btn
                  >
                </v-card-text>
              </v-row>
            </div>
          </v-card>
        </v-col>
        <v-col class="pa-0 ma-0">
          <v-row class="pa-0">
            <v-col class="pa-0">
              <v-card-title class="text-h6 font-weight-bold pt-2 pb-0 pl-6"> {{ review.review.title }} </v-card-title>
              <v-row align="center" justify="start" class="ml-3 mt-0 pl-2 align-start align-content-start">
                <v-col class="shrink pr-0 pl-1 py-0 mt-0 mt-lg-2 mt-md-2 mt-sm-2">
                  <v-chip small label outlined color="blue" class="d-none d-sm-flex">{{ review.course.teachers }}</v-chip>
                  <v-chip x-small label outlined color="blue" class="s-flex d-sm-none">{{ review.course.teachers }}</v-chip>
                </v-col>
                <v-col class="shrink pr-0 pl-2 py-0 mt-0 mt-lg-2 mt-md-2 mt-sm-2">
                  <v-chip small label outlined color="red" class="d-none d-sm-flex">{{ years }}</v-chip>
                  <v-chip x-small label outlined color="red" class="s-flex d-sm-none">{{ years }}</v-chip>
                </v-col>
              </v-row>
            </v-col>
            <v-col class="pa-0 ma-0 d-flex align-start pl-16 pt-1" cols="3">
              <v-card-text class="pa-1 pl-0 caption pt-2 grey--text d-sm-block align-end ml-auto d-none" style="height: 50%">
                <div class="d-block align-self-end">
                  <span class="d-inline-flex"> 总评分 </span>
                  <v-progress-linear
                    :value="review.review.rank.overall * 20"
                    :buffer-value="review.review.rank.overall * 20"
                    height="10"
                    class="d-inline-flex ml-1"
                    style="width: 60%; padding-top: 2px"
                  />
                </div>
                <div class="d-block">
                  <span class="d-inline-flex"> 内容 </span>
                  <v-progress-linear
                    :value="review.review.rank.content * 20"
                    :buffer-value="review.review.rank.content * 20"
                    height="10"
                    class="d-inline-flex ml-4"
                    style="width: 60%; padding-top: 2px"
                  />
                </div>
                <div class="d-block">
                  <div class="d-block">
                    <span class="d-inline-flex"> 工作量 </span>
                    <v-progress-linear
                      :value="review.review.rank.workload * 20"
                      :buffer-value="review.review.rank.workload * 20"
                      height="10"
                      class="d-inline-flex ml-1"
                      style="width: 60%; padding-top: 2px"
                    />
                  </div>
                </div>
                <div class="d-block">
                  <div class="d-block">
                    <span class="d-inline-flex"> 考核 </span>
                    <v-progress-linear
                      :value="review.review.rank.assessment * 20"
                      :buffer-value="review.review.rank.assessment * 20"
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
              <v-card-text class="red--text py-0 shrink" v-if="review.review.remark <= -5" style="font-size: x-small">* 此测评被多人反对, 请谨慎参考</v-card-text>
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
          <v-tooltip right class="ma-0 pa-0" color="white">
            <template v-slot:activator="{ on, attrs }">
              <v-card-text class="pa-1 pl-0 caption" v-bind="attrs" v-on="on">
                总评分 <font-awesome-icon :class="rankColorOverall" :icon="rankIconOverall" /> &nbsp;内容
                <font-awesome-icon :class="rankColorContent" :icon="rankIconContent" />&nbsp;工作量
                <font-awesome-icon :class="rankColorWorkload" :icon="rankIconWorkload" />&nbsp;考核
                <font-awesome-icon :class="rankColorAssessment" :icon="rankIconAssessment" />
              </v-card-text>
            </template>
            <span class="ma-0 pa-0"
              ><font-awesome-icon icon="fa-solid fa-face-grin-stars" class="orange--text" /><br />
              <font-awesome-icon icon="fa-solid fa-laugh" class="brown--text" /><br />
              <font-awesome-icon icon="fa-solid fa-smile" class="grey--text" /><br />
              <font-awesome-icon icon="fa-solid fa-meh" class="black--text" /><br />
              <font-awesome-icon icon="fa-solid fa-frown" class="red--text" />
            </span>
          </v-tooltip>
        </div>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { reviewWithCourse } from '@/models'
import { parseYearSemester } from '@/utils/course'

export default Vue.extend({
  name: 'ReviewCard',
  props: {
    review: reviewWithCourse
  },
  data: () => ({
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
      let rankColorOverall = ['red--text', 'black--text', 'grey--text', 'brown--text', 'orange--text']
      return rankColorOverall[this.review?.review.rank.overall - 1]
    },
    rankColorContent(): string {
      let rankColorContent = ['red--text', 'black--text', 'grey--text', 'brown--text', 'orange--text']
      return rankColorContent[this.review?.review.rank.content - 1]
    },
    rankColorWorkload(): string {
      let rankColorWorkload = ['red--text', 'black--text', 'grey--text', 'brown--text', 'orange--text']
      return rankColorWorkload[this.review?.review.rank.workload - 1]
    },
    rankColorAssessment(): string {
      let rankColorAssessment = ['red--text', 'black--text', 'grey--text', 'brown--text', 'orange--text']
      return rankColorAssessment[this.review?.review.rank.assessment - 1]
    },
    rankIconOverall(): string {
      let rankIconOverall = ['fa-solid fa-face-frown', 'fa-solid fa-face-meh', 'fa-solid fa-face-smile', 'fa-solid fa-face-laugh', 'fa-solid fa-face-grin-stars']
      return rankIconOverall[this.review?.review.rank.overall - 1]
    },
    rankIconContent(): string {
      let rankIconContent = ['fa-solid fa-face-frown', 'fa-solid fa-face-meh', 'fa-solid fa-face-smile', 'fa-solid fa-face-laugh', 'fa-solid fa-face-grin-stars']
      return rankIconContent[this.review?.review.rank.content - 1]
    },
    rankIconWorkload(): string {
      let rankIconWorkload = ['fa-solid fa-face-frown', 'fa-solid fa-face-meh', 'fa-solid fa-face-smile', 'fa-solid fa-face-laugh', 'fa-solid fa-face-grin-stars']
      return rankIconWorkload[this.review?.review.rank.workload - 1]
    },
    rankIconAssessment(): string {
      let rankIconAssessment = ['fa-solid fa-face-frown', 'fa-solid fa-face-meh', 'fa-solid fa-face-smile', 'fa-solid fa-face-laugh', 'fa-solid fa-face-grin-stars']
      return rankIconAssessment[this.review?.review.rank.assessment - 1]
    },
    years(): string {
      return parseYearSemester(this.review?.course)
    }
  },
  beforeMount() {
    this.remark = this.review?.review.remark
  },
  methods: {
    async editForm(): Promise<void> {
      console.log('openEditForm')
      this.$emit('openEditForm', this.review)
    },
    async editPhoneForm(): Promise<void> {
      this.$emit('openPhoneEditForm', this.review)
    },
    async upVote(): Promise<void> {
      if (this.unlike) {
        this.unlike = false
        this.like = true
        this.remark = this.remark + 2
        await this.$store.commit('cancelLikeReview', {
          reviewId: this.review
        })
        await this.$store.commit('likeReview', {
          reviewId: this.review?.review.id
        })
      } else if (this.like) {
        this.like = false
        this.remark = this.remark - 1
        await this.$store.commit('cancelLikeReview', {
          reviewId: this.review?.review.id
        })
      } else {
        this.like = true
        this.remark = this.remark + 1
        await this.$store.commit('likeReview', {
          reviewId: this.review?.review.id
        })
      }
    },
    async downVote(): Promise<void> {
      if (this.like) {
        this.like = false
        this.unlike = true
        this.remark = this.remark - 2
        await this.$store.commit('cancelLikeReview', {
          reviewId: this.review?.review.id
        })
        await this.$store.commit('unlikeReview', {
          reviewId: this.review?.review.id
        })
      } else if (this.unlike) {
        this.unlike = false
        this.remark = this.remark + 1
        await this.$store.commit('cancelUnlikeReview', {
          reviewId: this.review?.review.id
        })
      } else {
        this.unlike = true
        this.remark = this.remark - 1
        await this.$store.commit('unlikeReview', {
          reviewId: this.review?.review.id
        })
      }
    }
  }
})
</script>

<style scoped></style>
