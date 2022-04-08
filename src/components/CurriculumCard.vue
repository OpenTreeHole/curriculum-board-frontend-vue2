<template>
  <v-sheet class="mx-auto">
    <template>
      <v-progress-linear :active="false" height="10"></v-progress-linear>
    </template>
    <v-card-text class="pb-0 pt-1">
      <v-chip-group>
        <v-chip small>数学</v-chip>
        <v-chip small>工科试验班</v-chip>
      </v-chip-group>
    </v-card-text>
    <v-card-title class="pt-0 pb-0">
      <v-col>
        <v-row>
          <span class="grey--text subtitle-1 ml-1" style="margin-top: 1px"> {{ courseGroup.id }} </span>
        </v-row>
        <v-row class="mb-0 mt-3">
          <span class="text-h5 font-weight-black">习近平新时代中国特色社会主义重要思想概论</span>
        </v-row>
      </v-col>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-4">
      <v-col class="pa-0">
        <v-row class="mx-0" align="center">
          <span class="text-caption mr-2" style="margin-top: 2px"> 5 条测评 </span>
          <v-spacer />
          <v-rating v-model="rating" background-color="white" color="orange accent-3" dense half-increments hover size="18" readonly></v-rating>
          <span class="grey--text caption ml-1" style="margin-top: 2px">好评如潮</span>
        </v-row>
      </v-col>
    </v-card-text>
  </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue'
import { CourseGroup } from '@/models'

export default Vue.extend({
  name: 'CurriculumCard',
  props: { groupId: Number },
  data() {
    return {
      rating: 4.5,
      courseGroup: null as CourseGroup | null
    }
  }
})
</script>

<style scoped></style>
