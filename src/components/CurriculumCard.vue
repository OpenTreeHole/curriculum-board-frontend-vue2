<template>
  <v-card max-width="374">
    <template>
      <v-progress-linear color="blue" height="10"></v-progress-linear>
    </template>
    <v-card-text class="pb-0 pt-1">
      <v-chip-group>
        <v-chip>数学</v-chip>
        <v-chip>工科试验班</v-chip>
      </v-chip-group>
    </v-card-text>
    <v-card-title class="pt-0 pb-0">
      <v-col>
        <v-row class="mb-2">
          <div>离散数学</div>
          <div>(PTSS110005.02)</div>
        </v-row>
        <v-row>
          <div class="my-1 text-subtitle-1">张建国</div>
        </v-row>
      </v-col>
    </v-card-title>
    <v-card-text>
      <v-row class="mx-0">
        <v-rating
          v-model="rating"
          background-color="orange lighten-3"
          color="orange"
          size="23"
          half-increments
        ></v-rating>
        <div class="grey--text ms-4">4.5 (413)</div>
      </v-row>
      <v-row>
        <v-col>
          <p>进入</p>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CurriculumCard",
  data() {
    return {
      rating: 4.5,
    };
  },
};
</script>

<style scoped></style>
