<template>
  <v-app>
    <v-app-bar color="primary">
      <h1 class="mx-4">蛋壳</h1>
    </v-app-bar>
    <v-main style="background-color: white">
      <portal-page />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import PortalPage from "./views/PortalPage.vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    //
  }),
  components: {
    PortalPage,
  },
});
</script>
