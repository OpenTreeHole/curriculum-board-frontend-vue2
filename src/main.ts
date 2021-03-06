import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import vuetify from './plugins/vuetify'
import VirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

// import '@/mock/mock-data'
// import '@/apis/database'

Vue.config.productionTip = false

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VirtualScroller)

// 2022-4-26 (@w568w): why do we need to re-invoke Vue.use here?
// It seems that even commenting out this line will break the build.
// Vue.use(Vuetify)

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
