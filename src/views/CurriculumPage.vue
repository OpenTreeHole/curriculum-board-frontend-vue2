<template>
  <v-container fluid class="ma-0 pa-0">
    <v-breadcrumbs style="background-color: #fbfbfd">
      <v-breadcrumbs-item class="text-h6 font-weight-black">&nbsp;{{ courseGroup.department }}</v-breadcrumbs-item>
      <v-breadcrumbs-divider class="text-h6 font-weight-black">/</v-breadcrumbs-divider>
      <v-breadcrumbs-item class="text-h6 font-weight-black">{{ courseGroup.name }}</v-breadcrumbs-item>
      <v-chip :key="v" v-for="v in credits" label class="subtitle-2 font-weight-bold ml-2 d-none d-sm-flex" color="accent">{{ v }} 学分 </v-chip>
      <v-row class="mt-1 d-flex d-sm-none">
        <v-col class="pt-1">
          <v-chip :key="v" v-for="v in credits" label small class="subtitle-2 font-weight-bold ml-2" color="accent">{{ v }} 学分 </v-chip>
        </v-col>
      </v-row>
    </v-breadcrumbs>
    <!-- 电脑页面  -->
    <v-row class="d-none d-sm-flex">
      <v-col cols="3">
        <v-card class="pb-4">
          <v-card-title class="text-h6 font-weight-black primary--text pb-0"> > 评分</v-card-title>
          <v-expansion-panels flat multiple>
            <v-expansion-panel class="py-0">
              <v-expansion-panel-header class="subtitle-1 font-weight-bold secondary--text">
                > 全部学期 (共{{ courseGroup.courseList.flatMap((course) => course.reviewList || []).length }}条)
              </v-expansion-panel-header>
              <v-expansion-panel-content class="py-0">
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">总体评分 </span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (特别好评)</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">课程内容</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (硬核)</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">工作量</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (轻松)</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">考核要求</span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (特别好评)</v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="py-0 mt-0">
              <v-expansion-panel-header class="mt-0 py-0 subtitle-1 font-weight-bold secondary--text"> > 2021-2022-1 (共10条) </v-expansion-panel-header>
              <v-expansion-panel-content class="py-0">
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">总体评分 </span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (特别好评)</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">课程内容</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (硬核)</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">工作量</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (轻松)</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">考核要求</span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (特别好评)</v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-card-title class="text-h6 font-weight-black primary--text pb-0"> > 授课教师</v-card-title>
          <v-card-actions class="pt-1">
            <v-chip-group class="ml-4">
              <v-chip small v-for="(v, i) in teacherTags" :key="i">{{ v }}</v-chip>
            </v-chip-group>
          </v-card-actions>
          <v-card-title class="text-h6 font-weight-black primary--text py-0"> > 标签</v-card-title>
          <v-card-actions class="pt-1">
            <v-chip-group class="ml-4">
              <v-chip small>专业课</v-chip>
              <v-chip small>第三模块</v-chip>
              <v-chip small>女</v-chip>
            </v-chip-group>
          </v-card-actions>
        </v-card>
        <v-banner style="text-align: center"> 发布测评 </v-banner>
      </v-col>
      <v-col cols="8">
        <review-filter class="my-2" />
        <review-card v-for="(v, i) in reviews" :key="'review' + i" :review="v"></review-card>
      </v-col>
    </v-row>
    <!-- 手机页面  -->
    <div class="d-block d-sm-none">
      <v-row class="mt-0">
        <v-col class="pt-1 pb-0">
          <v-card-title class="text-h6 font-weight-black primary--text py-0"> > 评分</v-card-title>
          <v-expansion-panels flat multiple>
            <v-expansion-panel class="py-0">
              <v-expansion-panel-header class="subtitle-1 font-weight-bold secondary--text">
                > 全部学期 (共{{ courseGroup.courseList.flatMap((course) => course.reviewList || []).length }}条)
              </v-expansion-panel-header>
              <v-expansion-panel-content class="py-0">
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">总体评分 </span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (特别好评)</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">课程内容</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (硬核)</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">工作量</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (轻松)</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">考核要求</span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (特别好评)</v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel class="py-0 mt-0">
              <v-expansion-panel-header class="mt-0 py-0 subtitle-1 font-weight-bold secondary--text"> > 2021-2022-1 (共10条) </v-expansion-panel-header>
              <v-expansion-panel-content class="py-0">
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">总体评分 </span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (特别好评)</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">课程内容</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (硬核)</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">工作量</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (轻松)</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">考核要求</span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (特别好评)</v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-card-title class="text-h6 font-weight-black primary--text pb-0"> > 授课教师</v-card-title>
          <v-card-actions class="pt-1">
            <v-chip-group class="ml-4">
              <v-chip small v-for="(v, i) in teacherTags" :key="i">{{ v }}</v-chip>
            </v-chip-group>
          </v-card-actions>
          <v-card-title class="text-h6 font-weight-black primary--text py-0"> > 标签</v-card-title>
          <v-card-actions class="pt-1">
            <v-chip-group class="ml-4">
              <v-chip small>专业课</v-chip>
              <v-chip small>第三模块</v-chip>
              <v-chip small>女</v-chip>
            </v-chip-group>
          </v-card-actions>
        </v-col>
      </v-row>
      <v-col>
        <review-filter class="my-2" />
        <review-card v-for="(v, i) in reviews" :key="'review' + i" :review="v"></review-card>
      </v-col>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { CourseGroup, Review, ReviewWithCourse } from '@/models'
import * as api from '@/apis'
import ReviewCard from '@/components/ReviewCard.vue'
import ReviewFilter from '@/components/ReviewFilter.vue'

export default Vue.extend({
  name: 'CurriculumPage',
  components: { ReviewFilter, ReviewCard },
  props: ['groupId'],
  data: () => ({
    courseGroup: null as CourseGroup | null,
    courses: [
      { text: '马克思主义学院', disabled: false },
      { text: '习近平新时代中国特色社会主义重要思想概论', disabled: true }
    ],
    filters: {
      teacher: null as string | null,
      year: null as string | null,
      semester: null as number | null
    }
  }),
  computed: {
    credits(): number[] {
      let creditsSet = new Set<number>()
      this.courseGroup?.courseList.forEach((course) => creditsSet.add(course.credit))
      return [...creditsSet]
    },
    teacherTags(): string[] {
      let teachersSet = new Set<string>()
      this.courseGroup?.courseList.forEach((course) => teachersSet.add(course.teachers))
      return ['所有', ...teachersSet]
    },
    reviews(): ReviewWithCourse[] {
      return (
        this.courseGroup?.courseList
          .filter(
            (course) =>
              (this.filters.teacher == null || course.teachers == this.filters.teacher) &&
              (this.filters.year == null || course.year == this.filters.year) &&
              (this.filters.semester == null || course.semester == this.filters.semester)
          )
          .flatMap((course) => course.reviewList?.map((review) => new ReviewWithCourse(review, course)) || []) || []
      )
    }
  },
  methods: {
    // Get or load a course group with all reviews loaded.
    async getOrLoadCourseGroup(groupId: number): Promise<CourseGroup | null> {
      const loadReviews = async (courseGroup: CourseGroup) => {
        if (courseGroup.courseList.some((course) => !course.reviewList)) {
          const groupWithAllReviews = await api.getCourseGroup(groupId)
          this.$store.commit('addCourseGroup', { newCourseGroup: groupWithAllReviews })
          return groupWithAllReviews
        }
        return courseGroup
      }
      const getCourseGroup = async (groupId: number): Promise<CourseGroup | null> => {
        const groups = this.$store.state.data.courseGroup as CourseGroup[]
        const foundGroup = groups.find((group) => group.id == groupId)
        console.log(foundGroup)
        if (foundGroup) return await loadReviews(foundGroup)
        return null
      }

      const result = await getCourseGroup(groupId)
      if (result) return result
      else {
        this.$store.commit('addCourseGroup', { newCourseGroup: await api.getCourseGroup(groupId) })
        return getCourseGroup(groupId)
      }
    }
  },
  async mounted() {
    this.courseGroup = await this.getOrLoadCourseGroup(this.groupId)
  }
})
</script>

<style scoped></style>
