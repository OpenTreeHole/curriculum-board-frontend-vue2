<template>
  <div :id="this.content" name="description" class="vditor">
    <div class="vditor-toolbar pl-0"></div>
  </div>
</template>

<script lang="ts">
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import Vue from 'vue'

export default Vue.extend({
  name: 'ReviewEditor',
  data: () => ({
    editor: null as Vditor | null,
    content: '11'
  }),
  async mounted() {
    await this.$nextTick()
    this.editor = new Vditor(this.content, {
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
        this.editor?.setValue('hello, Vdito + Vue!')
      }
    })
  }
})
</script>

<style scoped></style>
