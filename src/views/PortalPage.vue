<template>
  <v-container>
    <div id="search-bar">
      <h1 style="margin-top: 28vh" class="justify-center d-none d-lg-flex d-xl-none">请输入课程名称</h1>
      <h2 style="margin-top: 28vh" class="d-flex justify-center d-lg-none d-xl-flex">请输入课程名称</h2>
      <v-row no-gutters class="mt-3 mx-3">
        <v-col cols="4" md="2" lg="2" sm="1" class="d-none d-sm-flex">
          <v-select label="搜索类别" filled outlined class="rounded-r-0"></v-select>
        </v-col>
        <v-col>
          <v-text-field v-model="searchText" outlined class="rounded-l-0 d-none d-sm-flex"></v-text-field>
          <v-text-field v-model="searchText" outlined dense class="d-flex d-sm-none"></v-text-field>
        </v-col>
      </v-row>
      <transition name="fade">
        <v-list v-if="inSearch">
          <v-card v-for="(v, i) in searchResult" :key="i" class="pa-2 v-card--hover">
            <div @click="$router.push('/group/' + v.id)">
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
import { Course, CourseGroup } from '@/models'
import Vue from 'vue'
import gasp from 'gsap'
import { match } from 'pinyin-pro'
import { isDebug } from '@/utils'

export default Vue.extend({
  name: 'PortalPage',
  data() {
    return {
      searchText: '',
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

      this.searchResult = (this.$store.state.data.courseGroup as CourseGroup[]).filter(
        (course) => match(course.name, this.searchText) || [course.name, course.code].some((field) => field.includes(this.searchText))
      )
    }
  },
  async mounted() {
    if (!isDebug()) {
      this.$store.commit('addCourseGroups', { newCourseGroups: await api.getCourseGroups() })
    }

    this.$store.commit('addCourseGroup', {
      newCourseGroup: new CourseGroup({
        code: 'JXT114514',
        courseList: [
          new Course({
            id: 1,
            codeId: 'JXT114514.01',
            code: 'JXT114514',
            department: '嘉心糖',
            teachers: '丁烷人',
            credit: 4,
            maxStudent: 114514,
            semester: 1,
            weekHour: 7,
            year: '2022',
            name: '嘉然今天吃七海nana7mi',
            reviewList: [
              {
                id: 1,
                timeCreated: '2022-04-09',
                title: '绝世好课',
                content: '每个脆脆鲨都应该来听的必修课程',
                rank: '10',
                remark: 10
              }
            ]
          })
        ],
        department: '嘉心糖',
        id: 1,
        name: '嘉然今天吃七海nana7mi'
      })
    })
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
