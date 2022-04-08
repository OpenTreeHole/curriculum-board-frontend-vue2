<template>
  <v-container>
    <div id="search-bar">
      <h1 style="text-align: center; margin-top: 28vh">请输入课程名称</h1>
      <v-row no-gutters class="mt-3">
        <v-col cols="2">
          <v-select label="搜索类别" filled outlined class="rounded-r-0"></v-select>
        </v-col>
        <v-col>
          <v-text-field v-model="searchText" outlined class="rounded-l-0"></v-text-field>
        </v-col>
      </v-row>
      <transition name="fade">
        <v-list v-if="inSearch">
          <v-card v-for="(v, i) in searchResult" :key="i" class="pa-2 v-card--hover">
            <div>
              <p class="monospace grey--text mb-1">{{ v.code }}</p>
              <p class="headline">{{ v.name }}</p>
            </div>
          </v-card>
        </v-list>
      </transition>
    </div>
  </v-container>
</template>

<script lang="ts">
import * as api from '@/apis'
import { CourseGroup } from '@/models'
import Vue from 'vue'
import gasp from 'gsap'
import { match } from 'pinyin-pro'

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
    inSearch() {
      if (this.inSearch) {
        gasp.to('#search-bar', {
          y: -100,
          duration: 0.2
        })
      } else {
        gasp.to('#search-bar', {
          y: 0,
          duration: 0.2
        })
      }
    },
    searchText() {
      if (this.searchText.trim() == '') {
        this.searchResult = []
        this.inSearch = false
        return
      }

      this.inSearch = true
      this.searchResult = this.courseGroup.filter((course) => match(course.name, this.searchText) || [course.name, course.code].some((field) => field.includes(this.searchText)))
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
