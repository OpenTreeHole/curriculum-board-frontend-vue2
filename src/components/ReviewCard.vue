<template>
  <v-container class="pa-0">
    <v-card>
      <v-row no-gutters class="d-flex justify-space-between ml-1">
        <v-col class="pa-0 ma-0" cols="10" lg="11" md="11" sm="10">
          <v-card-title class="text-h6 font-weight-bold pt-3 pb-2"> {{ review.review.title }} </v-card-title>
          <v-row align="center" justify="start" class="ml-3 pb-3 mt-0 mb-2">
            <v-col class="shrink pr-0 pl-1 py-0">
              <v-chip small label outlined color="blue"><v-icon small> mdi-account-outline </v-icon>{{ review.course.teachers }}</v-chip>
            </v-col>
            <v-col class="shrink pr-0 pl-2 py-0">
              <v-chip small label outlined color="red"><font-awesome-icon icon="fa-solid fa-calendar-days" />&nbsp; {{ years }}</v-chip>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical />
        <v-col style="background-color: rgba(0, 0, 0, 0.03)" class="d-flex align-center justify-center" cols="2" lg="1" md="1" sm="2">
          <v-card class="pa-0 ma-0 mx-7 d-flex justify-space-between" flat>
            <div class="pl-1" style="background-color: rgba(0, 0, 0, 0.03)">
              <v-row style="font-size: 30px" class="mt-0 grey--text align-self-start">
                <font-awesome-icon icon="fa-solid fa-caret-up" :class="this.like ? 'blue--text' : 'grey--text'" @click="upVote" />
              </v-row>
              <v-row class="text-h5 mt-1">
                <v-col class="ma-0 py-0" :style="this.remark < 0 ? 'padding-left: 1px; padding-right: 2px' : 'padding-left: 3px; padding-right: 5px'">
                  {{ this.remark }}
                </v-col>
              </v-row>
              <v-row style="font-size: 30px" class="mt-0 pt-1 mb-1 grey--text align-self-end">
                <font-awesome-icon :class="this.unlike ? 'red--text' : 'grey--text'" icon="fa-solid fa-caret-down" @click="downVote" />
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card-text class="caption red--text pb-0 pt-3 shrink">* 此测评被多人反对, 请谨慎参考</v-card-text>
      <v-card-text class="body-2 black--text pt-3">
        {{ review.review.content }}
      </v-card-text>
      <v-card-text class="caption grey--text pb-2 d-flex justify-end pr-3 pt-0">
        <v-chip x-small label style="margin-top: 1px; margin-right: 10px">已编辑</v-chip>
        <v-btn text x-small color="grey"><v-icon small style="padding-bottom: 2px; padding-right: 2px">mdi-trash-can</v-icon><span>删除</span></v-btn>
        <v-btn class="d-none d-sm-flex" text x-small color="grey" @click="editForm">
          <v-icon small style="padding-bottom: 2px; padding-right: 2px">mdi-pencil</v-icon><span>编辑</span>
        </v-btn>
        <v-btn class="d-flex d-sm-none" @click="editPhoneForm" text x-small color="grey"
          ><v-icon small style="padding-bottom: 2px; padding-right: 2px">mdi-pencil</v-icon><span>编辑</span></v-btn
        >
      </v-card-text>
      <v-divider></v-divider>
      <v-row no-gutters style="background-color: rgba(0, 0, 0, 0.04)">
        <v-col cols="3" class="shrink pr-0">
          <v-card-text class="pa-1 pl-3 Caption grey--text">user113</v-card-text>
        </v-col>
        <v-col cols="9" style="text-align: right" class="pr-2">
          <v-card-text class="pa-1 pl-0 caption">
            总评分 <font-awesome-icon class="orange--text" icon="fa-solid fa-face-grin-beam" /> &nbsp;内容
            <font-awesome-icon class="grey--text" icon="fa-solid fa-face-meh" />&nbsp;工作量 <font-awesome-icon icon="fa-solid fa-face-frown" />&nbsp;考核
            <font-awesome-icon class="red--text" icon="fa-solid fa-face-sad-tear" />
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { ReviewWithCourse } from '@/models'
import { parseYearSemester } from '@/utils/course'

export default Vue.extend({
  name: 'ReviewCard',
  props: {
    review: ReviewWithCourse
  },
  data: () => ({
    remark: 0,
    like: false,
    unlike: false
  }),
  computed: {
    years(): string {
      return parseYearSemester(this.review?.course)
    }
  },
  methods: {
    async editForm(): Promise<void> {
      this.$emit('openEditForm')
    },
    async editPhoneForm(): Promise<void> {
      this.$emit('openPhoneEditForm')
    },
    async upVote(): Promise<void> {
      if (this.unlike) {
        this.unlike = false
        this.like = true
        this.remark = this.remark + 2
      } else if (this.like) {
        this.like = false
        this.remark = this.remark - 1
      } else {
        this.like = true
        this.remark = this.remark + 1
      }
    },
    async downVote(): Promise<void> {
      if (this.like) {
        this.like = false
        this.unlike = true
        this.remark = this.remark - 2
      } else if (this.unlike) {
        this.unlike = false
        this.remark = this.remark + 1
      } else {
        this.unlike = true
        this.remark = this.remark - 1
      }
    }
  }
})
</script>

<style scoped></style>
