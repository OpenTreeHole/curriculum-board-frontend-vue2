<template>
  <v-container>
    <v-row style="margin-top: 30vh">
      <v-col cols="4"></v-col>
      <v-col cols="4" style="text-align: center"><h1>请输入课程名称</h1></v-col>
      <v-col cols="4"></v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="2">
        <v-select label="搜索类别" outlined class="rounded-r-0"></v-select>
      </v-col>
      <v-col>
        <v-combobox outlined class="rounded-l-0"></v-combobox>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'PortalPage'
}
</script>

<style scoped></style>
