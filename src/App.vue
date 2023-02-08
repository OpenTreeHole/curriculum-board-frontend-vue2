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
    <v-system-bar height="20" color="white" class="d-flex justify-end pr-3"><span style="font-size: xx-small">v1.1.2</span></v-system-bar>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import MessageSnackbar from '@/components/MessageSnackbar.vue'

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
html,
body {
  /*Do not add overflow-x: hidden to body element, or the vue-virtual-scroller would not work*/
  height: 100%;
}

body {
  font-size: 16px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
}
</style>
