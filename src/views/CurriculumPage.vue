<template>
  <v-container fluid class="ma-0 pa-0">
    <v-breadcrumbs style="background-color: #fbfbfd" class="pl-4">
      <v-breadcrumbs-item class="text-h6 font-weight-black ml-0">&nbsp;{{ courseGroup.department }}</v-breadcrumbs-item>
      <v-breadcrumbs-divider class="text-h6 font-weight-black">/</v-breadcrumbs-divider>
      <v-breadcrumbs-item class="text-h6 font-weight-black">{{ courseGroup.name }}</v-breadcrumbs-item>
      <v-chip :key="v" v-for="v in credits" label class="subtitle-2 font-weight-bold ml-3 d-none d-sm-flex" color="accent">{{ v }} 学分 </v-chip>
    </v-breadcrumbs>
    <v-banner class="d-block d-sm-none mt-0 pt-0">
      <v-chip :key="v" v-for="v in credits" label small class="subtitle-2 font-weight-bold ml-3" color="accent">{{ v }} 学分 </v-chip>
    </v-banner>
    <!-- TODO pad页面 -->
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
          <v-card-actions class="pt-1 mb-2">
            <v-row align="center" justify="start" class="pl-4">
              <v-col class="shrink pb-0 pr-0">
                <v-chip small>第三模块</v-chip>
              </v-col>
              <v-col class="shrink pb-0 pr-0">
                <v-chip small>女</v-chip>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
        <div style="text-align: center" class="mt-3">
          <v-btn @click="review_sheet = !review_sheet"> 发布测评 </v-btn>
        </div>
      </v-col>
      <v-col cols="8">
        <review-filter class="my-2" />
        <review-card v-for="(v, i) in reviews" :key="'review' + i" :review="v"></review-card>
        <div :id="this.content" name="description"></div>
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
            <v-row align="center" justify="start" class="pl-4">
              <v-col class="shrink pb-0 pr-0">
                <v-chip small>第三模块</v-chip>
              </v-col>
              <v-col class="shrink pb-0 pr-0">
                <v-chip small>女</v-chip>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-row>
      <v-col>
        <review-filter class="my-2" />
        <div style="text-align: center" class="my-3">
          <v-btn @click="review_sheet_phone = !review_sheet_phone"> 发布测评 </v-btn>
        </div>
        <review-card v-for="(v, i) in reviews" :key="'review' + i" :review="v"></review-card>
      </v-col>
    </div>
    <!-- TODO pad以及手机端表单 -->
    <!-- 电脑表单  -->
    <v-dialog v-model="review_sheet" max-width="35%" class="d-none d-sm-flex">
      <v-card class="pa-4 ma-0">
        <v-card-title>
          <span class="text-h6">发表测评</span>
        </v-card-title>
        <v-form class="mx-6">
          <v-row>
            <v-col cols="11">
              <v-text-field :counter="20" required label="标题" class="pt-1"> </v-text-field>
            </v-col>
          </v-row>
          <v-row class="pt-0 mt-0">
            <v-col cols="5">
              <v-select required label="任课教师"></v-select>
            </v-col>
            <v-col cols="6">
              <v-select required label="课程时间"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <div :id="this.content" name="description"></div>
          </v-row>
          <v-divider class="mt-2" />
        </v-form>
        <v-card-title class="mb-2 mt-2"> 评分 </v-card-title>
        <v-row class="mx-3">
          <v-col cols="12" class="d-flex pb-2">
            <span class="subtitle-1 mr-5">总体评分</span>
            <v-rating background-color="pink lighten-3" color="pink" dense size="19"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">特别好评</span>
          </v-col>
        </v-row>
        <v-row class="mx-3 pt-0">
          <v-col cols="12" class="d-flex pt-0 pb-2">
            <span class="subtitle-1 mr-5">课程内容</span>
            <v-rating background-color="pink lighten-3" color="pink" dense size="19"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">硬核</span>
          </v-col>
        </v-row>
        <v-row class="mx-3 pt-0">
          <v-col cols="12" class="d-flex pt-0 pb-2">
            <span class="subtitle-1 mr-9">工作量</span>
            <v-rating background-color="pink lighten-3" color="pink" dense size="19"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">轻松</span>
          </v-col>
        </v-row>
        <v-row class="mx-3 pt-0">
          <v-col cols="12" class="d-flex pt-0 pb-2">
            <span class="subtitle-1 mr-5">考核要求</span>
            <v-rating background-color="pink lighten-3" color="pink" dense size="19"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">严格</span>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="review_sheet = false"> 取消 </v-btn>
          <v-btn color="blue darken-1" text> 发布 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 手机表单  -->
    <v-dialog v-model="review_sheet_phone" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>
          <span class="text-h6 mt-5">发布测评</span>
        </v-card-title>
        <v-form class="mx-12">
          <v-row class="mt-0">
            <v-col cols="12">
              <v-text-field :counter="20" required label="标题" class="pt-1"> </v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col cols="6">
              <v-select required label="任课教师"></v-select>
            </v-col>
            <v-col cols="6">
              <v-select required label="课程时间"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <div :id="this.content" name="description"></div>
          </v-row>
        </v-form>
        <v-card-title class="mb-2 mt-0"> 评分 </v-card-title>
        <v-row class="mx-6">
          <v-col cols="12" class="d-flex pb-2">
            <span class="subtitle-1 mr-5">总体评分</span>
            <v-rating background-color="pink lighten-3" color="pink" dense size="19"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">特别好评</span>
          </v-col>
        </v-row>
        <v-row class="mx-6 pt-0">
          <v-col cols="12" class="d-flex pt-0 pb-2">
            <span class="subtitle-1 mr-5">课程内容</span>
            <v-rating background-color="pink lighten-3" color="pink" dense size="19"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">硬核</span>
          </v-col>
        </v-row>
        <v-row class="mx-6 pt-0">
          <v-col cols="12" class="d-flex pt-0 pb-2">
            <span class="subtitle-1 mr-9">工作量</span>
            <v-rating background-color="pink lighten-3" color="pink" dense size="19"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">轻松</span>
          </v-col>
        </v-row>
        <v-row class="mx-6 pt-0">
          <v-col cols="12" class="d-flex pt-0 pb-2">
            <span class="subtitle-1 mr-5">考核要求</span>
            <v-rating background-color="pink lighten-3" color="pink" dense size="19"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">严格</span>
          </v-col>
        </v-row>
        <v-card-actions class="mr-4 mt-4">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="review_sheet_phone = false" class="mr-0"> 取消 </v-btn>
          <v-btn color="blue darken-1" class="mr-2 ml-0" text> 发布 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { CourseGroup, Review, ReviewWithCourse } from '@/models'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import * as api from '@/apis'
import ReviewCard from '@/components/ReviewCard.vue'
import ReviewFilter from '@/components/ReviewFilter.vue'

export default Vue.extend({
  name: 'CurriculumPage',
  components: { ReviewFilter, ReviewCard },
  props: ['groupId'],
  data: () => ({
    editor: null as Vditor | null,
    content: '',
    review_sheet: false,
    review_sheet_phone: false,
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
    this.editor = new Vditor(this.content, {
      height: window.innerHeight,
      placeholder: '说些什么......',
      toolbarConfig: {
        pin: false
      },
      icon: 'material',
      cache: {
        enable: true
      },
      counter: {
        enable: true
      },
      upload: {
        accept: 'image/*',
        handler: (files: File[]) =>
          new Promise<null>((resolve) => {
            for (const file of files) {
              const reader = new FileReader()
              reader.onload = async () => {
                resolve(null)
              }
              reader.readAsDataURL(file)
            }
          }),
        multiple: false,
        fieldName: 'image'
      }
    })
  }
})
</script>

<style scoped></style>
