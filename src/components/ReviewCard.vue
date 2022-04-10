<template>
  <v-container class="pa-0">
    <!-- 电脑端显示 -->
    <div class="d-none d-lg-block d-xl-none">
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
        <v-row no-gutters>
          <v-col cols="2" class="mt-2">
            <v-card-text> 总评分 <font-awesome-icon icon="fa-solid fa-face-grin-beam" /> </v-card-text>
          </v-col>
          <v-col cols="2" class="mt-2">
            <v-card-text> 课程内容 <font-awesome-icon icon="fa-solid fa-face-meh" /> </v-card-text>
          </v-col>
          <v-col cols="2" class="mt-2">
            <v-card-text> 工作量 <font-awesome-icon icon="fa-solid fa-face-frown" /></v-card-text>
          </v-col>
          <v-col cols="2" class="mt-2">
            <v-card-text> 考核 <font-awesome-icon icon="fa-solid fa-face-sad-tear" /> </v-card-text>
          </v-col>
          <v-col cols="3" />
        </v-row>
      </v-card>
    </div>
    <!-- 手机端显示 -->
    <v-card class="py-0 pr-0 d-sm-none">
      <v-row no-gutters class="d-flex justify-space-between">
        <v-card class="pa-0 ma-0" flat>
          <v-card-title class="text-h5 font-weight-bold"> {{ review.review.title }} </v-card-title>
          <v-card-subtitle class="pb-0"> {{ review.course.teachers }} (2021-2022-2)</v-card-subtitle>
          <!--        <v-card-subtitle class="pt-0 subtitle-1 grey&#45;&#45;text"> user113</v-card-subtitle>-->
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
      <v-row no-gutters>
        <v-card-text class="ml-5">
          总评分 <font-awesome-icon icon="fa-solid fa-face-grin-beam" /> &nbsp; 课程内容 <font-awesome-icon icon="fa-solid fa-face-meh" /> &nbsp; 工作量
          <font-awesome-icon icon="fa-solid fa-face-frown" /> &nbsp; 考核 <font-awesome-icon icon="fa-solid fa-face-sad-tear" />
        </v-card-text>
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
