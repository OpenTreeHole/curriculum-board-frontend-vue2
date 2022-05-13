<template>
  <v-container fluid class="ma-0 pa-0">
    <v-breadcrumbs style="background-color: #fbfbfd" class="pl-4">
      <v-skeleton-loader v-if="loading" type="heading" width="70%" height="40%" class="d-none d-sm-flex" />
      <v-skeleton-loader v-if="loading" type="heading" width="100%" height="20%" class="d-block d-sm-none" />
      <template v-if="!loading">
        <v-breadcrumbs-item class="text-h6 font-weight-black mx-2" to="/"><font-awesome-icon icon="fa-solid fa-chevron-left" /></v-breadcrumbs-item>
        <v-breadcrumbs-item class="text-h6 font-weight-black ml-0">&nbsp;{{ courseGroup.department }}</v-breadcrumbs-item>
        <v-breadcrumbs-divider class="text-h6 font-weight-black">/</v-breadcrumbs-divider>
        <v-breadcrumbs-item class="text-h6 font-weight-black">{{ courseGroup.name }}</v-breadcrumbs-item>
        <v-chip :key="v" v-for="v in credits" label class="subtitle-2 font-weight-bold ml-3 d-none d-sm-flex white--text" color="#FB8C00">{{ v }} 学分 </v-chip>
      </template>
    </v-breadcrumbs>
    <v-banner class="d-block d-sm-none" v-if="loading">
      <v-skeleton-loader type="text" width="20%" height="10%"></v-skeleton-loader>
    </v-banner>
    <v-banner class="d-block d-sm-none mt-0 pt-0" v-if="!loading">
      <v-chip :key="v" v-for="v in credits" label small class="subtitle-2 font-weight-bold ml-3 white--text" color="#FB8C00"
        >{{ v }}
        学分
      </v-chip>
    </v-banner>
    <!-- TODO pad页面以及表单 -->
    <!-- TODO 表单解耦  -->
    <!-- 电脑以及手机页面  -->
    <v-row>
      <v-col lg="3" cols="12" class="pb-0">
        <v-card class="pb-4" elevation="0">
          <v-card-title class="text-h6 font-weight-black pb-0 ml-1"> 评分</v-card-title>
          <v-skeleton-loader v-if="loading" type="paragraph" width="60%" class="ml-10 my-2"></v-skeleton-loader>
          <v-expansion-panels flat multiple class="py-0" v-if="!loading">
            <v-expansion-panel class="py-0">
              <!-- 总体评分 -->
              <v-expansion-panel-header class="mt-0 py-0 subtitle-1 font-weight-bold secondary--text ml-1">
                全部学期 (共 {{ courseGroup.courseList.flatMap((course) => course.reviewList || []).length }} 条)
              </v-expansion-panel-header>
              <v-expansion-panel-content class="py-0 pl-2" v-if="courseGroup.courseList.flatMap((course) => course.reviewList || []).length >= 3">
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">总体评分 </span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear style="width: 90%" :value="allRank.overall" :color="rankColorOverall(allRank.overall)"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">{{ allRank.overall }} ({{ rankWordOverall(allRank.overall) }})</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">课程内容</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear style="width: 90%" :value="allRank.content" :color="rankColorContent(allRank.content)"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">{{ allRank.content }} ({{ rankWordContent(allRank.content) }})</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">工作量</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear style="width: 90%" :value="allRank.workload" :color="rankColorWorkload(allRank.workload)"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">{{ allRank.workload }} ({{ rankWordWorkload(allRank.workload) }})</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">考核要求</span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear style="width: 90%" :value="allRank.assessment" :color="rankColorAssessment(allRank.assessment)"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">{{ allRank.assessment }} ({{ rankWordAssessment(allRank.assessment) }})</v-col>
                </v-row>
              </v-expansion-panel-content>
              <v-expansion-panel-content class="py-0 ma-0 pl-2" v-else>
                <v-subheader class="my-n4 mb-n7"> 评分太少, 不具有参考性 </v-subheader>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <!-- 学期评分 -->
            <v-expansion-panel class="py-0 mt-0" v-for="(reviews, year) in Object.fromEntries(semesterReview().entries())" :key="year + reviews.toString()">
              <v-expansion-panel-header class="mt-0 py-0 subtitle-1 font-weight-bold secondary--text ml-1">{{ year }} (共 {{ reviews.length }} 条) </v-expansion-panel-header>
              <v-expansion-panel-content class="py-0 pl-2" v-if="reviews.length >= 3">
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">总体评分</span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear :value="semesterRank(reviews).overall" style="width: 90%" :color="rankColorOverall(semesterRank(reviews).overall)"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">{{ semesterRank(reviews).overall }} ({{ rankWordOverall(semesterRank(reviews).overall) }})</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">课程内容</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear :value="semesterRank(reviews).content" style="width: 90%" :color="rankColorContent(semesterRank(reviews).content)"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">{{ semesterRank(reviews).content }} ({{ rankWordContent(semesterRank(reviews).content) }})</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">工作量</span></v-col>
                  <v-col cols="5">
                    <v-progress-linear :value="semesterRank(reviews).workload" style="width: 90%" :color="rankColorWorkload(semesterRank(reviews).workload)"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">{{ semesterRank(reviews).workload }} ({{ rankWordWorkload(semesterRank(reviews).workload) }})</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end">
                    <span class="subtitle-2 ml-1 mt-1 black--text">考核要求</span>
                  </v-col>
                  <v-col cols="5">
                    <v-progress-linear
                      style="width: 90%"
                      :value="semesterRank(reviews).assessment"
                      :color="rankColorAssessment(semesterRank(reviews).assessment)"
                    ></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">{{ semesterRank(reviews).assessment }} ({{ rankWordAssessment(semesterRank(reviews).assessment) }})</v-col>
                </v-row>
              </v-expansion-panel-content>
              <v-expansion-panel-content class="py-0 ma-0" v-else>
                <v-subheader class="my-n4 mb-n7 pl-2"> 评分太少, 不具有参考性 </v-subheader>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-card-title class="text-h6 font-weight-black py-0 pt-1 ml-1">授课教师</v-card-title>
          <v-skeleton-loader v-if="loading" type="sentences" width="60%" class="ml-10 my-2"></v-skeleton-loader>
          <v-card-actions class="pt-1 pb-1" v-if="!loading">
            <v-chip-group class="ml-4" column mandatory v-model="teacherTag" @change="changeTeacherFilter" active-class="blue--text">
              <v-chip active-class="chosen--text" small v-for="(v, i) in teacherTags()" :key="i" :disabled="ifTeacherTagDisabled(v)">{{ v }}</v-chip>
            </v-chip-group>
          </v-card-actions>
          <v-card-title class="text-h6 font-weight-black py-0 ml-1">时间</v-card-title>
          <v-skeleton-loader v-if="loading" type="sentences" width="60%" class="ml-10 my-2"></v-skeleton-loader>
          <v-card-actions class="pt-1 mb-2" v-if="!loading">
            <v-chip-group class="ml-4" column mandatory v-model="timeTag" @change="changeTimeFilter" active-class="blue--text">
              <v-chip active-class="chosen--text" small v-for="(v, i) in timeTags()" :key="i" :disabled="ifTimeTagDisabled(v)">{{ v }}</v-chip>
            </v-chip-group>
          </v-card-actions>
          <v-divider />
        </v-card>
        <div style="text-align: center" class="mt-1 d-none d-sm-block">
          <v-btn @click="changeFormView(null)" :disabled="loading || posted" elevation="0">发布测评</v-btn>
        </div>
      </v-col>
      <v-col lg="8" class="mx-lg-0 mx-3">
        <v-skeleton-loader v-if="loading" type="heading" class="ml-2 my-lg-4 mb-5"></v-skeleton-loader>
        <div v-if="!loading" class="d-none d-sm-block mt-10">
          <v-row style="text-align: center" v-if="reviews.length === 0">
            <v-col class="text-h5 my-4 grey--text"> 暂时没有测评 </v-col>
          </v-row>
          <review-card v-for="(v, i) in reviews" :key="'review' + i" :review="v" @openEditForm="changeFormView" class="mb-3"></review-card>
        </div>
        <div style="text-align: center" class="mb-4 d-block d-sm-none mt-0">
          <v-btn @click="changePhoneFormView(null)" :disabled="loading || posted" elevation="0"> 发布测评</v-btn>
        </div>
        <v-card v-if="loading" class="pa-2 mb-3">
          <v-skeleton-loader type="article, actions" width="100%" class="my-2"></v-skeleton-loader>
        </v-card>
        <v-row class="d-flex align-center" v-if="loading">
          <v-col style="text-align: center">
            <v-progress-circular :size="60" color="primary" indeterminate class="d-none d-sm-inline-block mt-3"></v-progress-circular>
            <v-progress-circular :size="40" color="primary" indeterminate class="d-inline-block d-sm-none"></v-progress-circular>
          </v-col>
        </v-row>
        <div v-if="!loading" class="d-block d-sm-none">
          <v-row style="text-align: center" v-if="reviews.length === 0">
            <v-col class="text-h6 my-2 grey--text"> 暂时没有测评 </v-col>
          </v-row>
          <review-card v-for="(v, i) in reviews" :key="'reviewOnPhone' + i" :review="v" @openPhoneEditForm="changePhoneFormView" class="mb-5"></review-card>
        </div>
        <div class="my-8"></div>
      </v-col>
    </v-row>
    <!-- 电脑表单  -->
    <v-dialog v-model="reviewSheet" max-width="50%" class="d-none d-sm-flex">
      <v-card class="pa-4 ma-0">
        <v-card-title>
          <span class="text-h6 mb-3">发布测评</span>
        </v-card-title>
        <v-form class="mx-7" v-model="valid" ref="reviewSheet">
          <v-row>
            <v-col cols="8">
              <v-text-field :counter="20" required label="标题" class="pt-1 font-weight-bold" v-model="reviewTitle" :rules="reviewTitleRules"></v-text-field>
            </v-col>
          </v-row>
          <v-row class="pt-0 mt-0 pl-3 mb-2 pr-7">
            <v-select
              :items="teachersSelectList"
              item-text="title"
              item-value="value"
              clearable
              required
              label="任课教师"
              :rules="[(v) => !!v || '请选择任课教师']"
              class="font-weight-regular mr-2"
              style="width: min-content"
              @change="banTime"
              v-model="teacherSelected"
              return-object
            ></v-select>
            <v-select
              :items="timeSelectList"
              clearable
              required
              item-text="title"
              item-value="value"
              label="课程时间"
              :rules="[(v) => !!v || '请选择课程时间']"
              class="font-weight-regular mr-2"
              style="width: min-content"
              @change="banTeachers"
              v-model="timeSelected"
              return-object
            ></v-select>
            <v-text-field required readonly class="subtitle-2 font-weight-regular" v-model="courseId" style="width: min-content"></v-text-field>
          </v-row>
          <ReviewEditor class="mt-2 mr-3" ref="reviewEditor" v-if="!RenderingEditor" />
          <v-snackbar v-model="snackbar" :timeout="2000">
            请输入{{ snackbarContent
            }}<template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
            </template>
          </v-snackbar>
          <!--          <v-snackbar :timeout="3000" v-model="error" absolute centered right tile color="red accent-2"> 喔嚄, 出错了, {{ ErrorMessage }} </v-snackbar>-->
        </v-form>
        <v-card-title class="mb-2 mt-2"> 评分</v-card-title>
        <v-row class="mx-3">
          <v-col cols="12" class="d-flex pb-2">
            <span class="subtitle-1 mr-5">总体评分</span>
            <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.overall" :color="postRankColorOverall"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">{{ postRankWordOverall }}</span>
          </v-col>
        </v-row>
        <v-row class="mx-3 pt-0">
          <v-col cols="12" class="d-flex pt-0 pb-2">
            <span class="subtitle-1 mr-5">课程内容</span>
            <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.content" :color="postRankColorContent"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">{{ postRankWordContent }}</span>
          </v-col>
        </v-row>
        <v-row class="mx-3 pt-0">
          <v-col cols="12" class="d-flex pt-0 pb-2">
            <span class="subtitle-1 mr-9">工作量</span>
            <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.workload" :color="postRankColorWorkload"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">{{ postRankWordWorkload }}</span>
          </v-col>
        </v-row>
        <v-row class="mx-3 pt-0">
          <v-col cols="12" class="d-flex pt-0 pb-2">
            <span class="subtitle-1 mr-5">考核要求</span>
            <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.assessment" :color="postRankColorAssessment"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">{{ postRankWordAssessment }}</span>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reviewSheet = false"> 取消</v-btn>
          <v-btn color="blue darken-1" text @click="postReview" :disabled="!valid" :loading="postingReviewLoading"> 发布</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 手机表单  -->
    <v-dialog v-model="reviewSheetPhone" ref="reviewSheet" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>
          <span class="text-h6 mt-5">发布测评</span>
        </v-card-title>
        <v-form class="mx-10" v-model="valid" ref="reviewSheet">
          <v-row class="mt-0">
            <v-col cols="12">
              <v-text-field
                :counter="20"
                required
                label="标题"
                class="pt-1 font-weight-bold"
                style="font-size: small"
                v-model="reviewTitle"
                :rules="reviewTitleRules"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-select
              :items="teachersSelectList"
              item-text="title"
              item-value="value"
              clearable
              required
              label="任课教师"
              :rules="[(v) => !!v || '请选择任课教师']"
              class="font-weight-regular mx-3"
              style="width: min-content; font-size: small"
              @change="banTime"
              v-model="teacherSelected"
              return-object
            ></v-select>
            <v-select
              :items="timeSelectList"
              clearable
              required
              item-text="title"
              item-value="value"
              label="课程时间"
              :rules="[(v) => !!v || '请选择课程时间']"
              class="font-weight-regular mx-3"
              style="width: min-content; font-size: small"
              @change="banTeachers"
              v-model="timeSelected"
              return-object
            ></v-select>
          </v-row>
          <v-row class="pa-0">
            <v-text-field
              label="课程编号"
              required
              readonly
              dense
              class="subtitle-2 font-weight-regular mx-3 mt-6 mb-2"
              v-model="courseId"
              style="width: max-content; font-size: small"
            ></v-text-field>
          </v-row>
          <ReviewEditor class="mt-2" style="font-size: small" ref="reviewEditor" />
          <v-snackbar v-model="snackbar" :timeout="2000"
            >请输入{{ snackbarContent
            }}<template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
            </template></v-snackbar
          >
          <v-snackbar :timeout="3000" v-model="error" absolute centered right tile color="red accent-2"> 喔嚄, 出错了, {{ ErrorMessage }} </v-snackbar>
        </v-form>
        <v-card-title class="mb-2 mt-3"> 评分</v-card-title>
        <v-row class="mx-9">
          <v-col cols="12" class="d-flex pb-2">
            <span class="subtitle-1 mr-5">总体评分</span>
            <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.overall" :color="postRankColorOverall"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">特别好评</span>
          </v-col>
        </v-row>
        <v-row class="mx-9 pt-0">
          <v-col cols="12" class="d-flex pt-0 pb-2">
            <span class="subtitle-1 mr-5">课程内容</span>
            <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.content" :color="postRankColorContent"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">硬核</span>
          </v-col>
        </v-row>
        <v-row class="mx-9 pt-0">
          <v-col cols="12" class="d-flex pt-0 pb-2">
            <span class="subtitle-1 mr-9">工作量</span>
            <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.workload" :color="postRankColorWorkload"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">轻松</span>
          </v-col>
        </v-row>
        <v-row class="mx-9 pt-0">
          <v-col cols="12" class="d-flex pt-0 pb-2">
            <span class="subtitle-1 mr-5">考核要求</span>
            <v-rating background-color="pink lighten-3" dense size="19" v-model="rank.assessment" :color="postRankColorAssessment"></v-rating>
            <span class="subtitle-2 grey--text ml-2" style="margin-top: 2px">严格</span>
          </v-col>
        </v-row>
        <v-card-actions class="mr-4 mt-4">
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reviewSheetPhone = false" class="mr-0">取消</v-btn>
          <v-btn color="blue darken-1" class="mr-2 ml-0" text :disabled="!valid" @click="postReview" :loading="postingReviewLoading">发布</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { CourseGroup, PostReviewData, ReviewWithCourse, TotalRank } from '@/models'
import * as api from '@/apis'
import ReviewCard from '@/components/ReviewCard.vue'
import ReviewEditor from '@/components/ReviewEditor.vue'
import { parseYearSemester } from '@/utils/course'
import { toNumber } from 'lodash-es'
import { addReview } from '@/apis'
// import { match } from 'pinyin-pro'

export interface itemList {
  title: string
  value: string
  disabled: boolean
}
export default Vue.extend({
  name: 'CurriculumPage',
  components: { ReviewEditor, ReviewCard },
  props: ['groupId'],
  data: () => ({
    posted: false,
    RenderingEditor: false,
    loading: true,
    valid: true,
    snackbarContent: '',
    error: false,
    ErrorMessage: '',
    snackbar: false,
    reviewSheet: false,
    postingReviewLoading: false,
    reviewTitle: '',
    reviewTitleRules: [(v: string) => !!v || '评论标题不能为空', (v: string) => v.length <= 20 || '评论标题不能超过20字'],
    teacherTag: 0,
    timeTag: 0,
    courseId: '',
    disabledTeacherTag: [] as string[],
    disabledTimeTag: [] as string[],
    teachersSelectList: [] as itemList[],
    timeSelectList: [] as itemList[],
    rank: {
      overall: 0,
      content: 0,
      workload: 0,
      assessment: 0
    },
    teacherSelected: {} as itemList | null,
    timeSelected: {} as itemList | null,
    allRank: {
      overall: 0,
      content: 0,
      workload: 0,
      assessment: 0
    },
    reviewSheetPhone: false,
    courseGroup: null as CourseGroup | null,
    filters: {
      teacher: null as string | null,
      year: null as string | null,
      semester: null as number | null
    }
  }),
  computed: {
    postRankWordOverall(): string {
      const rankWordOverall = ['无', '特别差评', '差评', '一般', '好评', '特别好评']
      return rankWordOverall[this.rank.overall]
    },
    postRankWordContent(): string {
      const rankWordContent = ['无', '非常容易', '容易', '一般', '较难', '硬核']
      return rankWordContent[this.rank.content]
    },
    postRankWordWorkload(): string {
      const rankWordWorkload = ['无', '非常大', '大', '适中', '小', '非常小']
      return rankWordWorkload[this.rank.workload]
    },
    postRankWordAssessment(): string {
      const rankWordAssessment = ['无', '非常严格', '严格', '适中', '宽松', '非常宽松']
      return rankWordAssessment[this.rank.assessment]
    },
    postRankColorOverall(): string {
      if (this.rank.overall >= 5) {
        return 'green'
      } else if (this.rank.overall >= 2) {
        return 'orange'
      } else {
        return 'red'
      }
    },
    postRankColorContent(): string {
      if (this.rank.content >= 5) {
        return 'green'
      } else if (this.rank.content >= 2) {
        return 'orange'
      } else {
        return 'red'
      }
    },
    postRankColorWorkload(): string {
      if (this.rank.workload >= 5) {
        return 'green'
      } else if (this.rank.workload >= 2) {
        return 'orange'
      } else {
        return 'red'
      }
    },
    postRankColorAssessment(): string {
      if (this.rank.assessment >= 5) {
        return 'green'
      } else if (this.rank.assessment >= 2) {
        return 'orange'
      } else {
        return 'red'
      }
    },
    credits(): number[] {
      let creditsSet = new Set<number>()
      this.courseGroup?.courseList.forEach((course) => creditsSet.add(course.credit))
      return [...creditsSet]
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
    ifTeacherTagDisabled(teacherTag: string): boolean {
      if (teacherTag === '所有') return false
      else if (this.timeTag === 0) {
        let noReview = true
        this.courseGroup?.courseList.forEach((course) => {
          if (course.teachers === teacherTag) {
            if (course.reviewList !== undefined && course.reviewList?.length > 0) noReview = false
          }
        })
        return noReview
      } else {
        let noMatch = true
        this.courseGroup?.courseList.forEach((course) => {
          if (this.timeTags()[this.timeTag] === parseYearSemester(course)) {
            if (course.teachers === teacherTag) {
              noMatch = false
            }
          }
        })
        return noMatch
      }
    },
    ifTimeTagDisabled(timeTag: string): boolean {
      if (timeTag === '所有') return false
      else if (this.teacherTag === 0) {
        let noReview = true
        this.courseGroup?.courseList.forEach((course) => {
          if (timeTag === parseYearSemester(course)) {
            if (course.reviewList !== undefined && course.reviewList?.length > 0) noReview = false
          }
        })
        return noReview
      } else {
        let noMatch = true
        this.courseGroup?.courseList.forEach((course) => {
          if (this.teacherTags()[this.teacherTag] === course.teachers) {
            if (timeTag === parseYearSemester(course)) {
              noMatch = false
            }
          }
        })
        return noMatch
      }
    },
    banTeachers(): void {
      if (this.timeSelected === null) {
        for (const teacher of this.teachersSelectList) {
          teacher.disabled = false
        }
      } else {
        this.teachersSelectList.forEach((teacher) => {
          teacher.disabled = true
        })
        this.courseGroup?.courseList.forEach((course) => {
          if (this.timeSelected?.title === parseYearSemester(course)) {
            for (const teacher of this.teachersSelectList) {
              if (teacher.title === course.teachers) {
                teacher.disabled = false
              }
            }
          }
        })
      }
      if (this.teacherSelected !== null && this.timeSelected !== (null as itemList | null)) {
        this.courseGroup?.courseList.find((course) => {
          if (course.teachers === this.teacherSelected?.title && parseYearSemester(course) === this.timeSelected?.title) {
            this.courseId = course.codeId
          }
        })
      } else {
        this.courseId = this.courseGroup?.courseList[0].code ?? ''
      }
    },
    banTime(): void {
      if (this.teacherSelected === null) {
        for (const time of this.timeSelectList) {
          time.disabled = false
        }
      } else {
        this.timeSelectList.forEach((time) => {
          time.disabled = true
        })
        this.courseGroup?.courseList.forEach((course) => {
          if (this.teacherSelected?.title === course.teachers) {
            for (const time of this.timeSelectList) {
              if (time.title === parseYearSemester(course)) {
                time.disabled = false
              }
            }
          }
        })
      }
      if (this.timeSelected !== null && this.teacherSelected !== (null as itemList | null)) {
        this.courseGroup?.courseList.find((course) => {
          if (course.teachers === this.teacherSelected?.title && parseYearSemester(course) === this.timeSelected?.title) {
            this.courseId = course.codeId
          }
        })
      } else this.courseId = this.courseGroup?.courseList[0].code ?? ''
    },
    timeTags(): string[] {
      let timeSet = new Set<string>()
      for (const course of this.courseGroup?.courseList ?? []) {
        timeSet.add(parseYearSemester(course))
      }
      return ['所有', ...timeSet]
    },
    teacherTags(): string[] {
      let teachersSet = new Set<string>()
      for (const course of this.courseGroup?.courseList ?? []) {
        teachersSet.add(course.teachers)
      }
      return ['所有', ...teachersSet]
    },
    semesterReview(): Map<string, ReviewWithCourse[]> {
      let courses = this.reviewsCategorizedByYearSemester()
      for (let [key, value] of courses) {
        if (value.length == 0) {
          courses.delete(key)
        }
      }
      return courses
    },
    reviewsCategorizedByYearSemester(): Map<string, ReviewWithCourse[]> {
      let resultMap = new Map<string, ReviewWithCourse[]>()
      for (const course of this.courseGroup?.courseList || []) {
        const yearSemester = parseYearSemester(course)
        const reviews = course.reviewList?.map((review) => new ReviewWithCourse(review, course)) || []
        if (resultMap.has(yearSemester)) {
          resultMap.get(yearSemester)?.push(...reviews)
        } else {
          resultMap.set(yearSemester, reviews)
        }
      }
      return resultMap
    },
    changeTimeFilter() {
      if (this.timeTag === 0) {
        this.filters.year = null
        this.filters.semester = null
      } else {
        this.filters.year = this.timeTags()[this.timeTag].split('-')[0]
        let semester = this.timeTags()[this.timeTag].split('-')[2]
        if (semester === '1') {
          this.filters.semester = 1
        } else if (semester === '寒假') {
          this.filters.semester = 2
        } else if (semester === '3') {
          this.filters.semester = 3
        } else if (semester === '暑假') {
          this.filters.semester = 4
        }
      }
    },
    changeTeacherFilter() {
      if (this.teacherTag === 0) {
        this.filters.teacher = null
      } else this.filters.teacher = this.teacherTags()[this.teacherTag]
    },
    rankColorWorkload(workload: number): string {
      if (workload >= 75) {
        return 'green'
      } else if (workload >= 40) {
        return 'orange'
      } else {
        return 'red'
      }
    },
    rankColorAssessment(assessment: number): string {
      if (assessment >= 75) {
        return 'green'
      } else if (assessment >= 40) {
        return 'orange'
      } else {
        return 'red'
      }
    },
    rankColorOverall(overall: number): string {
      if (overall >= 75) {
        return 'green'
      } else if (overall >= 40) {
        return 'orange'
      } else {
        return 'red'
      }
    },
    rankColorContent(content: number): string {
      if (content) {
        return 'green'
      } else if (content >= 40) {
        return 'orange'
      } else {
        return 'red'
      }
    },
    rankWordAssessment(assessment: number): string {
      if (assessment < 20) {
        return '非常严格'
      } else if (assessment < 40) {
        return '严格'
      } else if (assessment < 60) {
        return '中等'
      } else if (assessment < 80) {
        return '宽松'
      } else {
        return '非常宽松'
      }
    },
    rankWordWorkload(workload: number): string {
      if (workload < 20) {
        return '非常大'
      } else if (workload < 40) {
        return '大'
      } else if (workload < 60) {
        return '中等'
      } else if (workload < 80) {
        return '小'
      } else {
        return '非常小'
      }
    },
    rankWordOverall(overall: number): string {
      if (overall < 10) {
        if ((this.courseGroup?.courseList.flatMap((course) => course.reviewList || []).length || 0) > 20) {
          return '差评如潮'
        } else return '特别差评'
      } else if (overall < 35) {
        return '多半差评'
      } else if (overall < 50) {
        return '褒贬不一'
      } else if (overall < 70) {
        return '多半好评'
      } else if (overall < 85) {
        return '好评'
      } else {
        if ((this.courseGroup?.courseList.flatMap((course) => course.reviewList || []).length || 0) > 20) {
          return '好评如潮'
        } else return '特别好评'
      }
    },
    rankWordContent(content: number): string {
      if (content < 20) {
        return '非常容易'
      } else if (content < 40) {
        return '容易'
      } else if (content < 60) {
        return '中等'
      } else if (content < 80) {
        return '较难'
      } else {
        return '硬核'
      }
    },
    semesterRank(reviews: ReviewWithCourse[]): TotalRank {
      const semesterTotalScore = new TotalRank({
        overall: 0,
        content: 0,
        workload: 0,
        assessment: 0
      })
      reviews.forEach((review) => {
        semesterTotalScore.overall += review.review.rank.overall
        semesterTotalScore.content += review.review.rank.content
        semesterTotalScore.workload += review.review.rank.workload
        semesterTotalScore.assessment += review.review.rank.assessment
      })
      semesterTotalScore.overall = Math.round((semesterTotalScore.overall / reviews.length) * 20.0)
      semesterTotalScore.content = Math.round((semesterTotalScore.content / reviews.length) * 20.0)
      semesterTotalScore.workload = Math.round((semesterTotalScore.workload / reviews.length) * 20.0)
      semesterTotalScore.assessment = Math.round((semesterTotalScore.assessment / reviews.length) * 20.0)
      return semesterTotalScore
    },
    async postReview() {
      if ((this.$refs.reviewSheet as Vue & { validate: () => boolean }).validate()) {
        if ((this.$refs.reviewEditor as any).getContent().length > 1) {
          if (this.rank.overall && this.rank.assessment && this.rank.content && this.rank.workload) {
            this.postingReviewLoading = true
            const review = {} as PostReviewData
            review.content = (this.$refs.reviewEditor as any).getContent()
            review.rank = this.rank
            review.title = this.reviewTitle
            if (this.posted) {
              let [reviewAdded, error] = await addReview(toNumber(this.courseId.split('.')[1]), review)
                .catch((error) => [null, error])
                .then((res) => [res, null])
              if (error) {
                console.log(error)
                this.postingReviewLoading = false
              } else if (reviewAdded) {
                console.log(this.posted)
                if (this.posted) {
                  await this.$store.commit('addReview', {
                    id: toNumber(this.courseId.split('.')[1]),
                    review: reviewAdded
                  })
                  this.reviewSheetPhone = false
                  this.reviewSheet = false
                } else {
                  await this.$store.commit('modifyReview', {
                    id: toNumber(this.courseId.split('.')[1]),
                    review: reviewAdded
                  })
                  this.reviewSheetPhone = false
                  this.reviewSheet = false
                }
                this.postingReviewLoading = false
              }
            }
          } else {
            this.snackbarContent = '评分'
            this.snackbar = true
          }
        } else {
          this.snackbarContent = '测评内容'
          this.snackbar = true
        }
      }
    },
    changeFormView(reviewWithCourse: ReviewWithCourse): void {
      if (reviewWithCourse) {
        this.rank = reviewWithCourse.review.rank
        this.reviewTitle = reviewWithCourse.review.title
        this.RenderingEditor = true
        if (this.$refs.reviewEditor as any) (this.$refs.reviewEditor as any).setContent(reviewWithCourse.review.content)
        this.teacherSelected!.title = reviewWithCourse.course.teachers
        this.teacherSelected!.value = reviewWithCourse.course.teachers
        this.teacherSelected!.disabled = false
        this.timeSelected!.title = parseYearSemester(reviewWithCourse.course)
        this.timeSelected!.value = parseYearSemester(reviewWithCourse.course)
        this.timeSelected!.disabled = false
        this.RenderingEditor = false
      }
      this.reviewSheet = !this.reviewSheet
    },
    changePhoneFormView(reviewWithCourse: ReviewWithCourse): void {
      if (reviewWithCourse) {
        this.rank = reviewWithCourse.review.rank
        this.reviewTitle = reviewWithCourse.review.title
        if (this.$refs.reviewEditor as any) (this.$refs.reviewEditor as any).setContent(reviewWithCourse.review.content)
        this.teacherSelected!.title = reviewWithCourse.course.teachers
        this.teacherSelected!.value = reviewWithCourse.course.teachers
        this.teacherSelected!.disabled = false
        this.timeSelected!.title = parseYearSemester(reviewWithCourse.course)
        this.timeSelected!.value = parseYearSemester(reviewWithCourse.course)
        this.timeSelected!.disabled = false
      }
      this.reviewSheetPhone = !this.reviewSheetPhone
    },
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
        // console.log(foundGroup)
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
    this.allRank = this.$store.getters.calculateCourseOverallRank(this.groupId)
    let timeSet = new Set<string>()
    let teachersSet = new Set<string>()
    this.courseGroup?.courseList.forEach((course) => {
      timeSet.add(parseYearSemester(course))
    })
    this.courseGroup?.courseList.forEach((course) => {
      teachersSet.add(course.teachers)
    })
    let timeArray = [...timeSet] as string[]
    let teachersArray = [...teachersSet] as string[]
    timeArray.forEach((time) => {
      this.timeSelectList.push({ title: time, value: time, disabled: false })
    })
    teachersArray.forEach((teacher) => {
      this.teachersSelectList.push({ title: teacher, value: teacher, disabled: false })
    })
    this.courseId = this.courseGroup?.courseList[0].code ?? ''
    this.reviews.forEach((review) => {
      if (review.review.isMe) {
        this.posted = true
        this.changeFormView(review)
        this.changePhoneFormView(review)
        this.reviewSheet = !this.reviewSheet
        this.reviewSheetPhone = !this.reviewSheetPhone
      }
    })
    this.loading = false
  }
})
</script>

<style scoped></style>
