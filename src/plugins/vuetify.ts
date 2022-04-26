import Vue from 'vue'
import Vuetify from 'vuetify/lib'
console.log(Vuetify)
// 2022-4-26 (@w568w): Is it necessary to import it from 'vuetify/lib', rather than 'vuetify/lib/framework' or 'vuetify'?
// From the source all of them are semantically identical. Is there anything to do with tree-shaking process?
Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#03a9f4',
        secondary: '#00bcd4',
        accent: '#ff9800',
        error: '#f44336',
        warning: '#ff5722',
        info: '#009688',
        success: '#8bc34a'
      }
    }
  }
})
