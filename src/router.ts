import Vue from 'vue'
import VueRouter, { Route, RouteConfig } from 'vue-router'
import CurriculumPage from '@/views/CurriculumPage.vue'
import PortalPage from '@/views/PortalPage.vue'
import config from '@/config'
import Cookies from 'js-cookie'

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
  },
  {
    path: '/login',
    meta: {
      title: '登录',
      hide: true
    },
    name: 'login',
    beforeEnter() {
      location.href = config.authBaseUrl + 'login?url=' + location.origin
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  // 如果url包含/jump?access={1}&refresh={2}
  if (to.fullPath && to.fullPath.includes('/jump?access=')) {
    // 从url中提取access和refresh token 并编辑 to.path
    const access = to.fullPath.split('=')[1].split('&')[0]
    const refresh = to.fullPath.split('=')[2]
    const path = to.fullPath.split('/jump?access=')[0]
    // 将token存入cookie
    Cookies.set('access', access)
    Cookies.set('refresh', refresh)
    // 跳转到刚才要去的页面
    next(path)
  }
  if (to.meta?.title) {
    document.title = to.meta.title
  }
  // console.log(Cookies.get('refresh'))
  if (Cookies.get('refresh') === undefined && to.name !== 'login') {
    return next('/login')
  }
  next()
})

export default router
