<template>
  <div :id="this.content" name="description" class="vditor"></div>
</template>

<script lang="ts">
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import Vue from 'vue'

export default Vue.extend({
  name: 'ReviewEditor',
  data: () => ({
    editor: null as Vditor | null,
    content: ''
  }),
  async mounted() {
    this.editor = new Vditor(this.content, {
      after: () => {
        // vditor.value is a instance of Vditor now and thus can be safely used here
        this.content = 'Vue Composition API + Vditor + TypeScript Minimal Example'
      }
    })
  }
})
</script>

<style scoped></style>
