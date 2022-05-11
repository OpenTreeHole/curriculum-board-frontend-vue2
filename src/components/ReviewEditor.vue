<template>
  <div :id="this.contentId" class="vditor"></div>
</template>

<script lang="ts">
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import Vue from 'vue'
import { login } from '@/apis'
import { after } from 'lodash-es'

export default Vue.extend({
  name: 'ReviewEditor',
  data: () => ({
    editor: null as Vditor | null,
    contentId: new Date().getTime().toString(),
    content: ''
  }),
  mounted() {
    this.editor = new Vditor(this.contentId, {
      height: window.innerHeight - 600,
      placeholder: '说些什么......',
      toolbar: [],
      cache: {
        enable: true
      },
      counter: {
        enable: false
      },
      after: async () => {
        this.editor?.setValue(this.content)
      }
      /* TODO 添加模版 */
    })
    this.$emit('editorReady')
  },
  methods: {
    setContent(content: string): void {
      this.editor?.setValue(content)
    },
    getContent() {
      return this.editor?.getValue()
    }
  }
})
</script>

<style scoped></style>
