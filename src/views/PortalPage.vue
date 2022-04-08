<template>
  <v-container>
    <v-row style="margin-top: 28vh">
      <v-col cols="4"></v-col>
      <v-col cols="4" style="text-align: center"><h1>请输入课程名称</h1></v-col>
      <v-col cols="4"></v-col>
    </v-row>
    <v-row no-gutters class="mt-3">
      <v-col cols="2">
        <v-select label="搜索类别" filled outlined class="rounded-r-0"></v-select>
      </v-col>
      <v-col>
        <v-text-field v-model="searchText"></v-text-field>
      </v-col>
    </v-row>
    <v-list>
      <v-card v-for="(v, i) in searchResult" :key="i" class="pa-2 v-card--hover">
        <div>
          <p class="monospace grey--text mb-1">{{ v.code }}</p>
          <p class="headline">{{ v.name }}</p>
        </div>
      </v-card>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import * as api from '@/apis'
import { CourseGroup } from '@/models'
import Vue from 'vue'

export default Vue.extend({
  name: 'PortalPage',
  data() {
    return {
      searchText: '',
      courseGroup: [] as CourseGroup[],
      searchResult: [] as CourseGroup[],
      inSearch: false
    }
  },
  watch: {
    searchText() {
      if (this.searchText.trim() == '') {
        this.searchResult = []
        this.inSearch = false
        return
      }

      this.inSearch = true
      this.searchResult = this.courseGroup.filter((course) => [course.name, course.code].some((field) => field.includes(this.searchText)))
    }
  },
  async mounted() {
    this.courseGroup = [
      new CourseGroup({
        code: 'JXT114514',
        courseList: [],
        department: 's',
        id: 1,
        name: '嘉然今天吃七海nana7mi'
      })
    ]
  }
})
</script>

<style scoped></style>
