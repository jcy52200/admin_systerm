import router from '@/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
import { asyncRoutes } from '@/router'

/**
 * 前置守卫
 */
const whiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  nProgress.start()
  if (store.getters.token) {
    // 存在token
    if (to.path === '/login') {
      // 跳转到主页
      next('/') // 中转到主页，但不会执行后置守卫
      nProgress.done()
    } else {
      // 判断是否获取过资料
      if (!store.getters.userId) {
        const { roles } = await store.dispatch('user/getUserInfo')
        // console.log(roles.menus)
        const filterRoutes = asyncRoutes.filter(item => {
          return roles.menus.includes(item.name)
        }) // 筛选后的结果
        store.commit('user/setRoutes', filterRoutes)
        router.addRoutes([...filterRoutes, { path: '*', redirect: '/404', hidden: true }])
        next(to.path)
      } else {
        next() // 放过
      }
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login') // 中转到登录页
      nProgress.done()
    }
  }
})

/**
 * 后置守卫
 */
router.afterEach(() => {
  nProgress.done()
})
