<template>
  <v-card flat color="rgba(118, 162, 176, 0.2)">
    <v-card-text class="pa-0 pl-2 caption grey--text">{{ this.review.timeUpdated.slice(0, 10) }}</v-card-text>
    <v-card-text class="pa-0 pl-2 caption grey--text">user {{ this.review.id }}</v-card-text>
    <v-icon size="100">$medal1</v-icon>
  </v-card>
</template>

<script>
import { Review } from '@/models'
import Vue from 'vue'

export default Vue.extend({
  props: {
    review: {
      type: Review,
      required: true
    }
  },
  name: 'UserCard',
  data: () => ({
    //
  }),
  mounted() {
    console.log(this.review)
  }
})
</script>

<style scoped></style>
