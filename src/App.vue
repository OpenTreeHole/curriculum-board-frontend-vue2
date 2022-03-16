<template>
  <v-app>
    <v-app-bar
      style="
        background: rgba(3, 169, 244, 0.6);
        -webkit-backdrop-filter: saturate(200%) blur(20px);
        backdrop-filter: saturate(200%) blur(20px);
      "
      max-height="60px"
      fixed
      elevation="0"
    >
      <div style="color: white">
        <font-awesome-icon icon="fa-solid fa-egg" class="text-h5" />
      </div>
      <h1 class="mx-3 white--text">蛋壳</h1>
    </v-app-bar>
    <v-main style="margin-top: 60px">
      <CurriculumPage />
      <PortalPage />
      <PortalPage />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import PortalPage from './views/PortalPage.vue'
import CurriculumPage from './views/CurriculumPage.vue'

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    // eslint-disable-next-line vue/no-unused-components
    PortalPage,
    CurriculumPage
  }
})
</script>
