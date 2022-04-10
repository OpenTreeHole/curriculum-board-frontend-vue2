<template>
  <v-container class="pa-0">
    <v-card>
      <v-row no-gutters class="d-flex justify-space-between">
        <v-card class="pa-0 ma-0" flat>
          <v-card-title class="text-h5 font-weight-bold"> {{ review.review.title }} </v-card-title>
          <v-card-subtitle class="pb-0"> {{ review.course.teachers }} (2021-2022-2)</v-card-subtitle>
        </v-card>
        <v-card style="background-color: rgba(0, 0, 0, 0.03)" flat class="d-flex">
          <v-divider vertical />
          <v-card class="pa-0 ma-0 mx-7 d-flex justify-space-between" flat>
            <div class="pl-1" style="background-color: rgba(0, 0, 0, 0.03)">
              <v-row style="font-size: 30px" class="mt-2 grey--text align-self-start">
                <font-awesome-icon icon="fa-solid fa-caret-up" />
              </v-row>
              <v-row class="text-h7 mt-1 align-self-center"> {{ review.review.remark }} </v-row>
              <v-row style="font-size: 30px" class="mt-0 pt-1 mb-1 grey--text align-self-end">
                <font-awesome-icon icon="fa-solid fa-caret-down" />
              </v-row>
            </div>
          </v-card>
        </v-card>
      </v-row>
      <v-divider></v-divider>
      <v-card-text class="body-2 black--text">
        {{ review.review.content }}
      </v-card-text>
      <v-divider></v-divider>
      <v-row no-gutters style="background-color: rgba(0, 0, 0, 0.04)">
        <v-col cols="3">
          <v-card-text class="pa-1 pl-4 Caption grey--text">user113</v-card-text>
        </v-col>
        <v-col cols="9" style="text-align: right" class="pr-3">
          <v-card-text class="pa-1 caption">
            总评分 <font-awesome-icon icon="fa-solid fa-face-grin-beam" /> &nbsp;课程内容 <font-awesome-icon icon="fa-solid fa-face-meh" />&nbsp;工作量
            <font-awesome-icon icon="fa-solid fa-face-frown" />&nbsp;考核 <font-awesome-icon icon="fa-solid fa-face-sad-tear" />
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
