<template>
  <v-app>
    <v-app-bar
      app
      style="background: rgba(102, 204, 255, 0.93); -webkit-backdrop-filter: saturate(200%) blur(20px); backdrop-filter: saturate(200%) blur(20px)"
      fixed
      max-height="64px"
    >
      <v-container class="py-0 fill-height ml-0">
        <h1 class="white--text">蛋壳</h1>
      </v-container>
    </v-app-bar>
    <v-main>
      <!-- TODO keep-alive -->
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  })
})
</script>
<style>
body {
  overflow-x: hidden;
  height: 100vh;
}
</style>
