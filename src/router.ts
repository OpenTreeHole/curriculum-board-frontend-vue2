import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'
import CurriculumPage from '@/views/CurriculumPage.vue'
import PortalPage from '@/views/PortalPage.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    name: 'group',
    path: '/group/:id',
    component: CurriculumPage,
    props: (route: Route) => ({
      groupId: parseInt(route.params.id)
    })
  },
  {
    name: 'portal',
    path: '/',
    component: PortalPage
  }
]

const router = new VueRouter({
  routes
})

export default router
