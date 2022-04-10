<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-sheet rounded="lg" elevation="2">
          <h2 class="pt-2" style="text-align: center">筛选器</h2>
          <v-divider class="my-2"></v-divider>
          <v-list color="transparent">
            <v-list-item v-for="n in 5" :key="n" link>
              <v-list-item-content>
                <v-list-item-title> List Item {{ n }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item link color="grey lighten-4">
              <v-list-item-content>
                <v-list-item-title> Refresh</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet rounded="lg" elevation="3">
          <v-row v-for="dex in list" :key="dex" class="pt-0">
            <v-col>
              <curriculum-card />
              <v-divider></v-divider>
            </v-col>
          </v-row>
          <router-view :key="$route.fullPath" />
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CurriculumCard from '@/components/CurriculumCard.vue'
import * as api from '@/apis'

export default {
  name: 'PortalPage',
  data() {
    return {
      panel: null,
      list: [1, 2, 3, 4, 5, 6]
    }
  },
  methods: {
    open_panel(index) {
      console.log(index)
      if (this.panel !== null) {
        this.panel = null
      } else {
        this.panel = index
      }
    }
  },

  components: {
    CurriculumCard
  }
}
</script>

<style scoped></style>
