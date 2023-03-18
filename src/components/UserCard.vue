<template>
  <v-card flat color="rgba(63, 81, 180, 0.07)">
    <v-row justify="space-between" class="mx-2 mx-lg-1 pa-0 pt-1 pt-lg-2 ma-0">
      <span class="pa-0 caption grey--text">{{ this.review.timeCreated.slice(0, 10) }}</span>
      <!--      <span style="font-size: 3px" class="py-0 grey&#45;&#45;text ml-0">已编辑</span>-->
    </v-row>
    <v-row align="center" class="mx-2 mx-lg-3 pa-0 py-2 pt-1 ma-0 d-inline-block">
      <span class="pa-0 pb-1 caption blue--text">user {{ this.review.reviewerId }}</span>
    </v-row>
    <user-medals 
      class="pb-2 mx-2"
      :review="review"
    ></user-medals>
  </v-card>
</template>

<script>
import { Review } from '@/models'
import Vue from 'vue'
import UserMedals from '@/components/UserMedals.vue'

export default Vue.extend({
  props: {
    review: {
      type: Review,
      required: true
    },
  },
  components: {
    UserMedals,
  },
  name: 'UserCard',
  data: () => ({
    //
  }),
  mounted() {
    //
  }
})
</script>

<style scoped></style>