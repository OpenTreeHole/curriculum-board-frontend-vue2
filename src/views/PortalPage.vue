<template>
  <v-container>
    <div id="search-bar">
      <h1 style="margin-top: 28vh" class="justify-center d-none d-lg-flex d-xl-none">请输入课程名称</h1>
      <h3 style="margin-top: 28vh" class="d-flex justify-center d-lg-none d-xl-flex">请输入课程名称</h3>
      <v-row no-gutters class="mt-3 mx-6">
        <v-col>
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="searchText" outlined class="d-none d-sm-block rounded-pill" filled></v-text-field>
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="searchText" outlined dense class="d-block d-sm-none rounded-pill" filled></v-text-field>
        </v-col>
      </v-row>
      <transition name="fade">
        <v-row class="ma-0 pa-0">
          <v-spacer />
          <v-col cols="12" lg="6" class="ma-0 pa-0">
            <v-list v-if="inSearch">
              <v-card v-for="(v, i) in searchResult" :key="i" class="pa-3 v-card--hover">
                <div @click="$router.push(`/group/${v.id}`)">
                  <v-card-subtitle class="monospace grey--text pb-3">
                    <span class="mr-3">{{ v.code }}</span>
                    <v-chip label small>3学分</v-chip>
                  </v-card-subtitle>
                  <v-card-title class="pt-0">{{ v.name }}</v-card-title>
                </div>
              </v-card>
            </v-list>
          </v-col>
          <v-spacer />
        </v-row>
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
                rank: {
                  overall: 5,
                  content: 4,
                  workload: 3,
                  assessment: 2
                },
                remark: 10
              },
              {
                id: 2,
                timeCreated: '2022-04-09',
                title: '绝世好课',
                content: '每个脆脆鲨都应该来听的必修课程',
                rank: {
                  overall: 4,
                  content: 4,
                  workload: 2,
                  assessment: 2
                },
                remark: -110
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
