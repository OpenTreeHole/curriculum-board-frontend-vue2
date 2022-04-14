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
      toolbarConfig: {
        pin: false,
        hide: true
      },
      toolbar: [
        'headings',
        'bold',
        'italic',
        'strike',
        'link',
        '|',
        'list',
        'ordered-list',
        'check',
        'outdent',
        'indent',
        '|',
        'quote',
        'line',
        'code',
        'inline-code',
        'table',
        '|',
        'undo',
        'redo',
        '|',
        'export'
      ],
      cache: {
        enable: true
      },
      counter: {
        enable: true
      },
      after: async () => {
        this.editor?.setValue('hello, Vdito + Vue!')
      }
    })
  }
})
</script>

<style scoped></style>
