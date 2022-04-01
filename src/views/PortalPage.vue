<template>
  <v-container>
    <v-row v-for="dex in list" :key="dex" class="pt-0">
      <v-col>
        <curriculum-card />
        <!-- TODO 筛选器 -->
        <v-divider></v-divider>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CurriculumCard from '@/components/CurriculumCard.vue'

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
