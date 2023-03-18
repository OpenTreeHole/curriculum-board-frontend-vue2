<template>
  <v-row no-gutters>
    <v-col 
      v-for="(medalName, index) in medalsInMap"
      :key="index"
      :cols="$vuetify.breakpoint.xs ? 6 : 4"
      class="d-inline-flex items-center justify-center py-1">
      <v-img
        :aspect-radio="86 / 100"
        :src="medalName"
        max-width="50">
      </v-img>
    </v-col>
  </v-row>
</template>


<script lang="ts">
import DankeFounders from '@/assets/UserMedals/DankeFounders.png'
import DankeTrailblazer from '@/assets/UserMedals/DankeTrailblazer.png'
import HighQualityProtein from '@/assets/UserMedals/HighQualityProtein.png'
import CatsAndRabbits from '@/assets/UserMedals/CatsAndRabbits.png'

import Vue from 'vue'
import { IAchievement, Review } from '@/models'

const imageMap: Record<string, string> = {
  "蛋壳奠基者": DankeFounders,
  "蛋壳开荒者": DankeTrailblazer,
  "优质蛋白": HighQualityProtein,
  "猫兔同笼": CatsAndRabbits,
}

export default Vue.extend({
  name: 'UserMedals',
  props: {
    review: {
      type: Review,
      required: true
    },
  },
  data() {
    return {};
  },
  computed: {
    medalsInMap(): string[] {
      return (
        this.review?.extra?.achievements
          ?.map((a: IAchievement) => {
            return imageMap[a.name];
          })
          .filter((i) => !!i) ?? []
      );
    }
  },
})
</script>

<style scoped></style>