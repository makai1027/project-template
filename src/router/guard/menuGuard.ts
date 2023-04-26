import type { Router, RouteRecordRaw } from 'vue-router'
import { getToken } from '@/utils/request/auth'
import { PageEnum } from '@/enums/pageEnum'
import { useAppStoreWithOut } from '@/store/modules/app'
import { PAGE_NOT_FOUND } from '../routes/basic'

const whitePathList: PageEnum[] = [PageEnum.BASE_LOGIN]

export function createMenuGuard(router: Router) {
  const appStore = useAppStoreWithOut()

  router.beforeEach(async (to, from, next) => {
    const token = getToken()

    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === PageEnum.BASE_LOGIN && token) {
        next((to.query?.redirect as string) || '/')
        return
      }
      next()
      return
    }

    if (!token) {
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: PageEnum.BASE_LOGIN,
        replace: true
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        }
      }
      next(redirectData)
      return
    }

    if (appStore.getMenuList.length) {
      next()
      return
    }
    const routeList = await appStore.buildRouterMenu()
    routeList.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })
    router.addRoute(PAGE_NOT_FOUND as unknown as RouteRecordRaw)

    if (to.name === PAGE_NOT_FOUND.name) {
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = from.query.redirect as string
      const redirect = decodeURIComponent(redirectPath)
      if (!redirectPath || redirect === to.path) {
        next()
      } else {
        next({ path: redirect })
      }
    }

    /* if (to.name === PAGE_NOT_FOUND.name) {
      next({ path: to.fullPath, replace: true, query: to.query })
    } else {
      const redirectPath = (from.query.redirect || to.path) as string
      const redirect = decodeURIComponent(redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
      next(nextData)
    } */
  })
}
