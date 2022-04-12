<template>
  <v-container class="pa-0">
    <v-card>
      <v-row no-gutters class="d-flex justify-space-between">
        <v-col class="pa-0 ma-0" cols="10" lg="11" md="11" sm="10">
          <v-card-title class="text-h6 font-weight-bold pt-3 pb-2"> {{ review.review.title }} </v-card-title>
          <v-row align="center" justify="start" class="ml-3 pb-3 mt-0 mb-2">
            <v-col class="shrink pr-0 pl-1 py-0">
              <v-chip small label outlined color="blue"><v-icon small> mdi-account-outline </v-icon>{{ review.course.teachers }}</v-chip>
            </v-col>
            <v-col class="shrink pr-0 pl-2 py-0">
              <v-chip small label outlined color="red"><font-awesome-icon icon="fa-solid fa-calendar-days" />&nbsp; 2011-2012</v-chip>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical />
        <v-col style="background-color: rgba(0, 0, 0, 0.03)" class="d-flex align-center justify-center" cols="2" lg="1" md="1" sm="2">
          <v-card class="pa-0 ma-0 mx-7 d-flex justify-space-between" flat>
            <div class="pl-1" style="background-color: rgba(0, 0, 0, 0.03)">
              <v-row style="font-size: 30px" class="mt-0 grey--text align-self-start">
                <font-awesome-icon icon="fa-solid fa-caret-up" class="blue--text" />
              </v-row>
              <v-row class="text-h7 mt-1 align-self-center"> {{ review.review.remark }} </v-row>
              <v-row style="font-size: 30px" class="mt-0 pt-1 mb-1 grey--text align-self-end">
                <font-awesome-icon icon="fa-solid fa-caret-down" />
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-card-text class="caption red--text pb-0 pt-3 shrink">* 此评论被多人反对, 请谨慎参考</v-card-text>
      <v-card-text class="body-2 black--text pt-3">
        {{ review.review.content }}
      </v-card-text>
      <v-card-text class="caption grey--text pb-2 d-flex justify-end pr-4 pt-0">
        <div class="mr-2"><v-icon small style="padding-bottom: 2px; padding-right: 2px">mdi-trash-can</v-icon><span>删除</span></div>
        <div><v-icon small style="padding-bottom: 2px; padding-right: 2px">mdi-pencil</v-icon><span>编辑</span></div>
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

export default Vue.extend({
  name: 'ReviewCard',
  props: {
    review: ReviewWithCourse
  }
})
</script>

<style scoped></style>
