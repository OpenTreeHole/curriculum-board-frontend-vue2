import Vue from 'vue'
import Vuex from 'vuex'
import data from '@/store/modules/data'

Vue.use(Vuex)

export type RootState = Record<string, never>

export default new Vuex.Store<RootState>({
  modules: { data: data }
})
