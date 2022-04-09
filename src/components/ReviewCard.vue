<template>
  <v-card class="pa-3 pt-0 pr-0">
    <v-row no-gutters>
      <v-col cols="11">
        <v-card-title class="text-h5 font-weight-bold"> {{ review.review.title }} </v-card-title>
        <v-card-subtitle class="pb-0"> {{ review.course.teachers }} (2021-2022-2)</v-card-subtitle>
        <!--        <v-card-subtitle class="pt-0 subtitle-1 grey&#45;&#45;text"> user113</v-card-subtitle>-->
        <v-card-text class="body-1">
          {{ review.review.content }}
        </v-card-text>
      </v-col>
      <v-divider vertical />
      <v-col cols="1" style="background-color: rgba(0, 0, 0, 0.03)">
        <v-row style="font-size: 40px; margin-left: 35%" class="mt-4 grey--text">
          <font-awesome-icon icon="fa-solid fa-caret-up" />
        </v-row>
        <v-row class="text-h5 mt-0" style="margin-left: 35%"> {{ review.review.remark }} </v-row>
        <v-row style="font-size: 40px; margin-left: 35%" class="mt-0 grey--text">
          <font-awesome-icon icon="fa-solid fa-caret-down" />
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row no-gutters class="ml-4">
      <v-col cols="1">
        <v-card-subtitle class="pt-3 pb-0 subtitle-1 primary--text font-weight-bold"> > 评分 </v-card-subtitle>
      </v-col>
      <v-col cols="2" class="mt-2">
        <v-card-text class="py-1"> 总评分(5) </v-card-text>
      </v-col>
      <v-col cols="2" class="mt-2">
        <v-card-text class="py-1"> 课程内容(4) </v-card-text>
      </v-col>
      <v-col cols="2" class="mt-2">
        <v-card-text class="py-1"> 工作量(4) </v-card-text>
      </v-col>
      <v-col cols="2" class="mt-2">
        <v-card-text class="py-1"> 考核(3) </v-card-text>
      </v-col>
    </v-row>
  </v-card>
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
