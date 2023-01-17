<template>
  <v-container>
    <message-snackbar ref="message" />
    <!--      <h1 style="margin-top: 28vh" class="justify-center d-none d-lg-flex d-xl-none">请输入课程名称</h1>-->
    <!--      <h3 style="margin-top: 28vh" class="d-flex justify-center d-lg-none d-xl-flex">请输入课程名称</h3>-->
    <div class="justify-center">
      <!--   Search Bar   -->
      <v-row class="mx-6" id="search-bar" style="margin-top: 25vh">
        <v-col>
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            placeholder="请输入课程名称或课程代码"
            v-model="searchText"
            outlined
            :dense="$vuetify.breakpoint.xsOnly"
            class="d-block rounded-pill"
            filled
          ></v-text-field>
        </v-col>
      </v-row>
      <!--   Random Review   -->
      <v-row justify="center">
        <random-review-card
          class="mx-6"
          v-if="this.searchText === '' && !loadingRandomReview"
          :review-content="this.randomReview.content"
          :course-name="this.randomReview.course.name"
          :user-id="this.randomReview.id"
          :course-id="this.randomReview.course.id"
        />
      </v-row>
      <v-row class="mt-n8 px-16 mb-3">
        <v-overlay :value="this.courseGroupProgress !== 100" opacity="50">
          <div style="width: 35vmax">
            <h2 class="mb-2 justify-center d-none d-sm-flex">{{ courseGroupProgressText }}</h2>
            <h4 class="mb-2 d-flex justify-center d-sm-none">{{ courseGroupProgressText }}</h4>
            <v-progress-linear v-model="courseGroupProgress" color="blue" rounded />
            <h2 class="mt-2 justify-center d-none d-sm-flex">第一次会用时较久</h2>
            <h4 class="mt-2 d-flex justify-center d-sm-none">第一次会用时较久</h4>
          </div>
        </v-overlay>
      </v-row>
    </div>

    <v-row class="d-flex align-center" v-if="this.loadingSearchResult && this.searchText !== ''">
      <v-col style="text-align: center">
        <v-progress-circular :size="60" color="primary" indeterminate class="d-none d-sm-inline-block"></v-progress-circular>
        <v-progress-circular :size="40" color="primary" indeterminate class="d-inline-block d-sm-none"></v-progress-circular>
      </v-col>
    </v-row>
    <transition name="fade" v-if="!loadingSearchResult">
      <v-row class="ma-0 pa-0">
        <v-spacer />
        <v-col cols="12" md="10" lg="7" xl="6" class="ma-0 pa-0">
          <DynamicScroller :min-item-size="96" :items="searchResult" v-slot="{ item: v }" page-mode>
            <v-divider></v-divider>
            <DynamicScrollerItem class="pa-0 pl-3 pt-1 pb-3" :item="v" :active="false">
              <div class="pl-4" @click="$router.push(`/group/${v.id}`)">
                <v-list-item-subtitle class="monospace grey--text pt-3 pb-1 d-flex">
                  <span class="mr-3 d-flex align-center">{{ v.code }}</span>
                  <v-chip label small :key="credit" v-for="credit in credits(v.courseList)" class="font-weight-bold mr-1" color="#FB8C00" outlined> {{ credit }}学分 </v-chip>
                </v-list-item-subtitle>
                <v-list-item-content text x-large class="ma-n2 pa-2 pb-3" style="height: initial">
                  <span class="font-weight-black fontsize-ensurer text-subtitle-1">
                    <span class="d-inline-block">{{ v.department }}&nbsp;/&nbsp;</span>
                    <span class="d-inline-block mt-2">{{ v.name }}</span>
                  </span>
                </v-list-item-content>
              </div>
            </DynamicScrollerItem>
          </DynamicScroller>
          <v-row style="text-align: center" v-if="this.noResult">
            <v-col class="text-h5 my-4 grey--text"> 无该课程</v-col>
          </v-row>
        </v-col>
        <v-spacer />
      </v-row>
    </transition>
  </v-container>
</template>

<script lang="ts">
import * as api from '@/apis'
import { Course, CourseGroup, ReviewWithCourse } from '@/models'
import Vue from 'vue'
import gasp from 'gsap'
import { courseGroupTable } from '@/apis/database'
import { initializeTokenize } from '@/utils/tokenize'
import MessageSnackbar from '@/components/MessageSnackbar.vue'
import { debounce } from 'lodash-es'
import { isDebug } from '@/utils'
import RandomReviewCard from '@/components/RandomReviewCard.vue'

export default Vue.extend({
  name: 'PortalPage',
  components: { RandomReviewCard, MessageSnackbar },
  data() {
    return {
      loadingSearchResult: true,
      loadingCourses: true,
      searchText: '',
      searchResult: [] as CourseGroup[],
      inSearch: false,
      noResult: false,
      courseGroupProgress: 100,
      courseGroupProgressText: '',
      randomReview: {} as ReviewWithCourse,
      loadingRandomReview: true
    }
  },
  watch: {
    searchText: {
      handler() {
        this.debouncedSearch()
      },
      deep: true
    }
  },
  methods: {
    debouncedSearch: debounce(async function (this: any) {
      this.noResult = false
      // 先假定有结果
      if (this.searchText.trim() == '') {
        // 如果没有输入，就不显示结果, 搜索框在页面中央
        this.searchResult = []
        this.inSearch = false
        gasp.to('#search-bar', {
          marginTop: '25vh',
          flex: '0 0 100%',
          duration: 0.3
        })
        return
      } else {
        // 如果有输入，就显示结果, 搜索框在页面顶部
        const searchResultPromise = (async () => {
          return (await courseGroupTable.where('index').startsWithAnyOfIgnoreCase(this.searchText).distinct().toArray()).map((courseGroup) => courseGroup.courseGroup)
        })()

        let flexShrinkProportion = 100
        if (this.$vuetify.breakpoint.md) {
          flexShrinkProportion = 93
        } else if (this.$vuetify.breakpoint.lg) {
          flexShrinkProportion = 65
        } else if (this.$vuetify.breakpoint.xl) {
          flexShrinkProportion = 60
        }

        if (!this.inSearch) {
          await gasp
            .to('#search-bar', {
              marginTop: '3vh',
              flex: '0 0 ' + flexShrinkProportion + '%',
              duration: 0.3
            })
            .then()
          this.inSearch = true
        }

        this.searchResult = await searchResultPromise
        // console.log(this.searchResult)

        this.noResult = this.searchResult.length == 0 && !this.loadingSearchResult

        // debug, 后面添加一个课程
        if (isDebug()) {
          this.searchResult.push({
            id: '123',
            name: '测试课程测试课测试测测试课程测试课测试测',
            code: 'TEST',
            department: '测试学院测试学院学园',
            courseList: [
              {
                id: '123',
                name: '测试课程',
                code: 'TEST',
                department: '测试学院学园',
                credit: 2,
                teacher: '测试老师',
                time: '测试时间',
                location: '测试地点',
                description: '测试描述',
                tags: ['测试标签']
              }
            ]
          })
        }
      }
    }, 200),
    credits(courseList: Course[]): number[] {
      let creditsSet = new Set<number>()
      courseList.forEach((course) => creditsSet.add(course.credit))
      return [...creditsSet]
    }
  },
  async mounted() {
    // this.$store.commit('addCourseGroups', { newCourseGroups: await api.getCourseGroups() })

    await api.fetchCourseGroups((text, progress) => {
      this.courseGroupProgressText = text
      this.courseGroupProgress = progress
    })

    this.randomReview = await api.getRandomReview()
    this.loadingRandomReview = false
    // console.log(this.randomReview)

    await initializeTokenize()

    // console.log(generateIndex('毛泽东思想和中国特色社会主义理论体系概论（上）'))

    this.debouncedSearch()
    this.loadingSearchResult = false
  }
})
</script>

<style scoped></style>
