<template>
  <v-container id="container">
    <message-snackbar ref="message" />
    <div id="search-bar">
      <!--      <h1 style="margin-top: 28vh" class="justify-center d-none d-lg-flex d-xl-none">请输入课程名称</h1>-->
      <!--      <h3 style="margin-top: 28vh" class="d-flex justify-center d-lg-none d-xl-flex">请输入课程名称</h3>-->
      <v-row no-gutters class="mt-3 mx-6" style="height: min-content">
        <v-col style="height: min-content" align-self="start">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            style="margin-top: 32vh"
            placeholder="请输入课程名称或课程代码"
            v-model="searchText"
            outlined
            class="d-none d-sm-flex rounded-pill mt-0"
            filled
          ></v-text-field>
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            style="margin-top: 32vh"
            placeholder="请输入课程名称或课程代码"
            v-model="searchText"
            outlined
            dense
            class="d-flex d-sm-none rounded-pill mt-0"
            filled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center" v-if="this.loadingSearchResult && this.searchText !== ''">
        <v-col style="text-align: center">
          <v-progress-circular :size="60" color="primary" indeterminate class="d-none d-sm-inline-block"></v-progress-circular>
          <v-progress-circular :size="40" color="primary" indeterminate class="d-inline-block d-sm-none"></v-progress-circular>
        </v-col>
      </v-row>
      <v-row class="ma-0 pa-0">
        <v-col class="pa-0 ma-0">
          <transition name="fade" v-if="!loadingSearchResult">
            <v-row class="ma-0 pa-0">
              <v-spacer />
              <v-col cols="12" lg="6" class="ma-0 pa-0">
                <v-list v-if="inSearch" two-line>
                  <template v-for="(v, i) in searchResult">
                    <v-divider :key="'divider' + i"></v-divider>
                    <v-list-item :key="i" class="pa-0 pl-3 pt-1 pb-3" @click="$router.push(`/group/${v.id}`)">
                      <div class="pl-4">
                        <v-list-item-subtitle class="monospace grey--text pt-3 pb-1 d-flex">
                          <span class="mr-3 d-flex align-center">{{ v.code }}</span>
                          <v-chip label small :key="credit" v-for="credit in credits(v.courseList)" class="font-weight-bold" color="#FB8C00" outlined> {{ credit }}学分</v-chip>
                        </v-list-item-subtitle>
                        <v-list-item-content text x-large class="ma-n2 pa-2 pb-3 pl-4" style="height: initial">
                          <span class="font-weight-black fontsize-ensurer text-subtitle-1"
                            ><span class="d-inline-block">{{ v.department }}&nbsp;/&nbsp;</span><span class="d-inline-block mt-2">{{ v.name }}</span></span
                          >
                        </v-list-item-content>
                      </div>
                    </v-list-item>
                  </template>
                </v-list>
                <v-row style="text-align: center" v-if="this.noResult">
                  <v-col class="text-h5 my-4 grey--text"> 无该课程 </v-col>
                </v-row>
                <v-row style="text-align: center" v-else-if="this.searchResult.length >= 10">
                  <v-col class="text-subtitle-1 my-2 grey--text"> 到底了 </v-col>
                </v-row>
              </v-col>
              <v-spacer />
            </v-row>
          </transition>
        </v-col>
      </v-row>
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
import _ from 'lodash'
import { courseGroupTable } from '@/apis/database'
import { load } from 'chinese-tokenizer'
import { generateIndex, initializeTokenize } from '@/utils/tokenize'
import MessageSnackbar from '@/components/MessageSnackbar.vue'

export default Vue.extend({
  name: 'PortalPage',
  components: { MessageSnackbar },
  data() {
    return {
      loadingSearchResult: true,
      loadingCourses: true,
      searchText: '',
      searchResult: [] as CourseGroup[],
      inSearch: false,
      noResult: false
    }
  },
  watch: {
    searchText: {
      handler() {
        if (this.searchText.length > 0) {
          // TODO pad上移距离
          gasp.to('#search-bar', {
            y: 0,
            duration: 0.3
          })
        }
        this.debouncedSearch()
        this.loadingSearchResult = false
        if (this.searchText.length === 0) {
          window.setTimeout(() => {
            let distance = window.innerWidth < 600 ? 250 : 150
            gasp.to('#search-bar', {
              y: distance,
              duration: 0.3
            })
          }, 600)
        }
      },
      deep: true
    }
  },
  methods: {
    debouncedSearch: _.debounce(async function (this: any) {
      this.noResult = false
      if (this.searchText.trim() == '') {
        this.searchResult = []
        this.inSearch = false
        return
      } else {
        this.inSearch = true
        this.searchResult = (
          await courseGroupTable
            // .filter(
            //   (courseGroup) =>
            //     !!match(courseGroup.courseGroup.name, this.searchText) ||
            //     [courseGroup.courseGroup.name, courseGroup.courseGroup.code].some((field) => field.includes(this.searchText))
            // )
            .where('index')
            .startsWithAnyOfIgnoreCase(this.searchText)
            .limit(200)
            .toArray()
        ).map((courseGroup) => courseGroup.courseGroup)
        this.noResult = this.searchResult.length == 0 && !this.loadingSearchResult
      }
    }, 600),
    credits(courseList: Course[]): number[] {
      let creditsSet = new Set<number>()
      courseList.forEach((course) => creditsSet.add(course.credit))
      return [...creditsSet]
    }
  },
  async mounted() {
    // eslint-disable-next-line no-constant-condition
    if (0) {
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
                  timeUpdated: '2022-04-09',
                  title: '绝世好课',
                  content: '每个脆脆鲨都应该来听的必修课程每个脆脆鲨都应该来听的必修课程',
                  reviewerId: 1,
                  rank: {
                    overall: 5,
                    content: 4,
                    workload: 3,
                    assessment: 2
                  },
                  remark: 10,
                  isMe: false
                },
                {
                  id: 2,
                  timeCreated: '2022-04-09',
                  timeUpdated: '2022-04-09',
                  title: 'A/414',
                  content: '每个脆脆鲨都应该来听的必修课程',
                  reviewerId: 2,
                  rank: {
                    overall: 4,
                    content: 4,
                    workload: 2,
                    assessment: 2
                  },
                  remark: -110,
                  isMe: false
                },
                {
                  id: 3,
                  timeCreated: '2022-04-09',
                  timeUpdated: '2022-04-09',
                  title: 'A/414',
                  content: '每个脆脆鲨都应该来听的必修课程',
                  reviewerId: 5,
                  rank: {
                    overall: 1,
                    content: 2,
                    workload: 1,
                    assessment: 1
                  },
                  remark: 110,
                  isMe: false
                }
              ]
            }),
            new Course({
              id: 2,
              codeId: 'JXT114514.02',
              code: 'JXT114514',
              department: '嘉心糖',
              teachers: '丙烷人',
              credit: 5,
              maxStudent: 114514,
              semester: 2,
              weekHour: 7,
              year: '2012',
              name: '嘉然今天吃七海nana7mi',
              reviewList: []
            }),
            new Course({
              id: 3,
              codeId: 'JXT114514.03',
              code: 'JXT114514',
              department: '嘉心糖',
              teachers: '向晚',
              credit: 6,
              maxStudent: 114514,
              semester: 2,
              weekHour: 7,
              year: '2023',
              name: '嘉然今天吃七海nana7mi',
              reviewList: [
                {
                  id: 3,
                  timeCreated: '2022-04-09',
                  timeUpdated: '2022-04-09',
                  title: '你们A/没有自己的测评网站吗',
                  content: '每个脆脆鲨都应该来听的必修课程',
                  reviewerId: 7,
                  rank: {
                    overall: 4,
                    content: 4,
                    workload: 2,
                    assessment: 2
                  },
                  remark: -110,
                  isMe: true
                }
              ]
            })
          ],
          department: '嘉心糖',
          id: 1,
          name: '嘉然今天吃七海nana7mi'
        })
      })
    } else {
      // this.$store.commit('addCourseGroups', { newCourseGroups: await api.getCourseGroups() })
      await api.fetchCourseGroups()
      let distance = window.innerWidth < 600 ? 250 : 300
      gasp.to('#search-bar', {
        y: distance,
        duration: 0
      })

      await initializeTokenize()

      console.log(generateIndex('毛泽东思想和中国特色社会主义理论体系概论（上）'))

      this.debouncedSearch()
    }
    this.loadingSearchResult = false
  }
})
</script>

<style scoped></style>
