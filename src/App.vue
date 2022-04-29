<template>
  <v-app>
    <message-snackbar ref="message" />
    <v-app-bar app style="background: #283593; -webkit-backdrop-filter: saturate(200%) blur(20px); backdrop-filter: saturate(200%) blur(20px)" fixed max-height="64px">
      <v-container class="py-0 fill-height ml-0">
        <h1 class="white--text">蛋壳</h1>
      </v-container>
    </v-app-bar>
    <v-main>
      <keep-alive>
        <router-view :key="$route.fullPath" />
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import MessageSnackbar from '@/components/MessageSnackbar.vue'
import { voteForReview } from './apis'

export default Vue.extend({
  name: 'App',
  components: { MessageSnackbar },
  data: () => ({
    //
  }),
  errorCaptured(err: Error, _vm: Vue, _info: string): boolean | void {
    ;(this.$refs.message as any).error(err)
    throw err
  }
})
</script>
<style>
body {
  overflow-x: hidden;
  height: 100vh;
}
</style>
