<template>
  <v-app>
    <v-app-bar
      app
      style="background: rgba(3, 169, 244, 0.6); -webkit-backdrop-filter: saturate(200%) blur(20px); backdrop-filter: saturate(200%) blur(20px)"
      fixed
      max-height="64px"
    >
      <v-container class="py-0 fill-height">
        <div style="color: white">
          <font-awesome-icon icon="fa-solid fa-egg" class="text-h5" />
        </div>
        <h1 class="mx-3 white--text">蛋壳</h1>
      </v-container>
    </v-app-bar>
    <v-main class="blue lighten-5">
      <v-container>
        <v-row>
          <v-col cols="3">
            <v-sheet rounded="lg" elevation="2">
              <h2 class="pt-2" style="text-align: center">筛选器</h2>
              <v-divider class="my-2"></v-divider>
              <v-list color="transparent">
                <v-list-item v-for="n in 5" :key="n" link>
                  <v-list-item-content>
                    <v-list-item-title> List Item {{ n }} </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item link color="grey lighten-4">
                  <v-list-item-content>
                    <v-list-item-title> Refresh </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet rounded="lg" elevation="3">
              <router-view :key="$route.fullPath" />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
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
