<template>
  <div :id="this.contentId" class="vditor"></div>
</template>

<script lang="ts">
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import Vue from 'vue'

export default Vue.extend({
  name: 'ReviewEditor',
  data: () => ({
    editor: null as Vditor | null,
    contentId: new Date().getTime().toString()
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
      }
      /*after: async () => {
        this.editor?.setValue('hello, Vditor + Vue!')
      }*/
      /* 这一部分会导致editor延迟一下渲染, TODO 解决延迟渲染并且可以使用模版 */
      /* TODO 添加模版 */
    })
    this.$emit('editorReady')
  },
  methods: {
    getContent() {
      return this.editor?.getValue()
    }
  }
})
</script>

<style scoped></style>
