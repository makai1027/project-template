import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { basicRoutes } from './routes/basic'

// 白名单应该包含基本静态路由
export const WHITE_NAME_LIST: string[] = []
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name)
    getRouteNames(item.children || [])
  })
getRouteNames(basicRoutes)

// 创建路由
export const router = createRouter({
  history: createWebHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 退出登录需要卸载路由
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

// 初始化注册路由
export const setupRouter = (app: App) => {
  app.use(router)
}
