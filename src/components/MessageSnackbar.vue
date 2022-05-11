<template>
  <div>
    <v-snackbar top :color="type" v-model="isAlert" :timeout="timeout">
      <v-icon left>
        {{ icon }}
      </v-icon>
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: function () {
    return {
      isAlert: false,
      type: 'info',
      message: '',
      icon: '',
      timeout: 2000
    }
  },
  methods: {
    /**
     * (Re)set the Message Component visible.
     */
    alert() {
      if (this.isAlert) {
        this.isAlert = false
        this.$nextTick(() => {
          this.isAlert = true
        })
      } else {
        this.isAlert = true
      }
    },

    success(message: string): void {
      this.type = 'success'
      this.message = message
      this.icon = 'mdi-check-circle-outline'
      this.alert()
    },

    info(message: string): void {
      this.type = 'info'
      this.message = message
      this.icon = 'mdi-alert-circle-outline'
      this.alert()
    },

    warning(message: string): void {
      this.type = 'warning'
      this.message = message
      this.icon = 'mdi-alert-outline'
      this.alert()
    },

    error(message: string): void {
      this.type = 'error'
      this.message = message
      this.icon = 'mdi-alert-octagram-outline'
      this.alert()
    }
  }
})
</script>
