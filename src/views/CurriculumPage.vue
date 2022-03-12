<template>
  <v-breadcrumbs class="secondary">
    <v-breadcrumbs-item class="text-h6 font-weight-black"
      >&nbsp;马克思主义学院</v-breadcrumbs-item
    >
    <v-breadcrumbs-divider class="text-h6 font-weight-black"
      >/</v-breadcrumbs-divider
    >
    <v-breadcrumbs-item class="text-h6 font-weight-black"
      >习近平新时代中国特色社会主义重要思想概论</v-breadcrumbs-item
    >
    <v-chip label class="subtitle-1 font-weight-bold ml-5" color="accent"
      >4 学分</v-chip
    >
  </v-breadcrumbs>
</template>

<script>
export default {
  name: "CurriculumPage",
  data: () => ({
    courses: [
      { text: "马克思主义学院", disabled: false },
      { text: "习近平新时代中国特色社会主义重要思想概论", disabled: true },
    ],
  }),
};
</script>

<style scoped></style>
