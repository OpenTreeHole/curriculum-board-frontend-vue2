<template>
  <v-container fluid class="ma-0 pa-0">
    <v-breadcrumbs style="background-color: #fbfbfd">
      <v-breadcrumbs-item class="text-h6 font-weight-black">&nbsp;{{ courseGroup.department }}</v-breadcrumbs-item>
      <v-breadcrumbs-divider class="text-h6 font-weight-black">/</v-breadcrumbs-divider>
      <v-breadcrumbs-item class="text-h6 font-weight-black">{{ courseGroup.name }}</v-breadcrumbs-item>
      <v-chip :key='v' v-for='v in credits' label class="subtitle-2 font-weight-bold ml-5" color="accent">{{ v }} 学分</v-chip>
    </v-breadcrumbs>
    <v-row>
      <v-col cols="3">
        <v-card class="pb-4">
          <v-card-title class="text-h6 font-weight-black primary--text pb-0"> > 评分 </v-card-title>
          <v-expansion-panels flat multiple>
            <v-expansion-panel class="py-0">
              <v-expansion-panel-header class="subtitle-1 font-weight-bold secondary--text"> > 全部学期 (共10条) </v-expansion-panel-header>
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
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">课程内容</span> </v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (硬核)</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">工作量</span> </v-col>
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
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">课程内容</span> </v-col>
                  <v-col cols="5">
                    <v-progress-linear value="15" style="width: 90%"></v-progress-linear>
                  </v-col>
                  <v-col cols="4" class="caption">8.5 (硬核)</v-col>
                </v-row>
                <v-row align="center" no-gutters>
                  <v-col cols="3" align-self="end"><span class="subtitle-2 ml-1 mt-1 black--text">工作量</span> </v-col>
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
          <v-card-title class="text-h6 font-weight-black primary--text pb-0"> > 授课教师 </v-card-title>
          <v-card-actions class="pt-1">
            <v-chip-group class="ml-4">
              <v-chip small>所有</v-chip>
              <v-chip small>张建国</v-chip>
              <v-chip small>张建国</v-chip>
            </v-chip-group>
          </v-card-actions>
          <v-card-title class="text-h6 font-weight-black primary--text py-0"> > 标签 </v-card-title>
          <v-card-actions class="pt-1">
            <v-chip-group class="ml-4">
              <v-chip small>专业课</v-chip>
              <v-chip small>第三模块</v-chip>
              <v-chip small>女</v-chip>
            </v-chip-group>
          </v-card-actions>
        </v-card>
        <v-banner style="text-align: center"> 发布测评或者评分 </v-banner>
      </v-col>
      <v-col cols="8">
        <v-banner> 全部测评 筛选 </v-banner>
        <v-card class="pa-3 pt-0 pr-0">
          <v-row no-gutters>
            <v-col cols="11">
              <v-card-title class="text-h5 font-weight-bold"> 老师很好, 课很好, 下学期还会再来 </v-card-title>
              <v-card-subtitle class="pb-0"> 张建国 (2021-2022-2)</v-card-subtitle>
              <v-card-subtitle class="pt-0 subtitle-1 grey--text"> user113</v-card-subtitle>
              <v-card-text class="body-1">
                课程听感: 每节课最开始是热身，包括一套类似徒手操的组合、一套更深度热身的小组合。
                然后是简单的舞蹈基本功，会教把杆动作（脚位，波浪腰，把杆压腿），以及做一些身体素质训练（高抬腿，开合跳，弓箭步跳）
                然后是教考试内容，老师一边示范一边说要点，到学期后面会锻炼我们听指令做反应的能力，会先说要点后做示范。教的时间其实并不长，然后就是重复练习和动作纠正。
                通常下课前还会剩下部分时间，会教一些其它的东西（21秋老师是教了中国舞的一些基本体态），最后几节课是做素质练习（主要是腹背肌）
                老师的体态真的特别美，声音也超好听，上她的课本身就是一种享受，更何况还能学到除了这套操之外很多别的东西，以及听老师讲自己的故事…… 作业/任务量:
                没有什么作业，唯一一次留实质性作业是交一篇讲述自己对健美操的理解以及锻炼计划的文稿。其它的“作业”只是课下熟悉刚教过的动作以及想反面动作。对于有点舞蹈基础或者身体协调的同学来说根本就是没有作业。
                关于考试: 期中是一套小舞蹈，五人一组展示，会让小组自己排队形，要求有队形变换。 期末是各班统一的那套健美操，也是五人一组，也要自己排队形、设计队形变换。
                不过队形变换老师说是“锦上添花”，最重要的还是动作本身。但是秦朗老师不会扣动作，而是鼓励每个同学在动作里加自己的风格和个性，而且会在最终展示那节课上让某个动作做得很有味道的同学出来单独展示。
                以及，最终考核中有一部分叫做学习态度。所以期中期末展示课的时候要多参与、发言、表达自己的感觉，这样其实自己的考试体验也会更开心。
              </v-card-text>
            </v-col>
            <v-divider vertical />
            <v-col cols="1" style="background-color: rgba(0, 0, 0, 0.03)">
              <v-row style="font-size: 40px; margin-left: 35%" class="mt-4 grey--text">
                <font-awesome-icon icon="fa-solid fa-caret-up" />
              </v-row>
              <v-row class="text-h5 mt-0" style="margin-left: 35%"> -5 </v-row>
              <v-row style="font-size: 40px; margin-left: 35%" class="mt-0 grey--text">
                <font-awesome-icon icon="fa-solid fa-caret-down" />
              </v-row>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row no-gutters class="ml-4">
            <v-col cols="1">
              <v-card-subtitle class="pt-3 pb-0 subtitle-1 primary--text font-weight-bold"> > 评分 </v-card-subtitle>
            </v-col>
            <v-col cols="2" class="mt-2">
              <v-card-text class="py-1"> 总评分(5) </v-card-text>
            </v-col>
            <v-col cols="2" class="mt-2">
              <v-card-text class="py-1"> 课程内容(4) </v-card-text>
            </v-col>
            <v-col cols="2" class="mt-2">
              <v-card-text class="py-1"> 工作量(4) </v-card-text>
            </v-col>
            <v-col cols="2" class="mt-2">
              <v-card-text class="py-1"> 考核(3) </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { CourseGroup } from '@/models'
import * as api from '@/apis'

export default Vue.extend({
  name: 'CurriculumPage',
  props: ['groupId'],
  data: () => ({
    courseGroup: null as CourseGroup | null,
    courses: [
      { text: '马克思主义学院', disabled: false },
      { text: '习近平新时代中国特色社会主义重要思想概论', disabled: true }
    ]
  }),
  computed: {
    credits() :number[]{
      let creditsSet=new Set<number>()
      this.courseGroup?.courseList.forEach(course=>creditsSet.add(course.credit))
      return [...creditsSet]
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
