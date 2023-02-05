<template>
  <v-card class="pa-3 mb-10" shaped>
    <!--    <v-card class="pa-3" @click="$router.push(`/group/${this.courseId}`)">-->
    <v-card-title class="text-subtitle-1 py-1">
      {{ this.courseName }}
    </v-card-title>
    <v-card-text class="py-0"> user {{ this.userId }}:</v-card-text>
    <!-- markdown viewer -->
    <div class="md-viewer pl-4 pr-lg-8 pt-lg-0 pr-2 pt-0">
      <div :ref="'reviewContent' + userId" />
    </div>
  </v-card>
</template>

<script lang="ts">
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import '@/style/markdown-theme.css'
import Vue from 'vue'

export default Vue.extend({
  name: 'RandomReviewCard',
  props: {
    reviewContent: {
      type: String,
      required: true
    },
    courseName: {
      type: String,
      required: true
    },
    courseId: {
      type: Number,
      required: true
    },
    userId: {
      type: Number,
      required: true
    }
  },
  data: () => ({
    viewer: null
  }),
  watch: {
    reviewContent() {
      this.viewer.setMarkdown(this.reviewContent)
    }
  },
  mounted() {
    this.viewer = new Viewer({
      el: this.$refs['reviewContent' + this.userId],
      initialValue: this.reviewContent
    })
  }
})
</script>
