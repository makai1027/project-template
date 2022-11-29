import { defineStore } from 'pinia'
import { store } from '@/store'
import { Persistent } from '@/utils/cache/persistent'
import { USER_INFO_KEY } from '@/enums/cacheEnum'
import { getMenuListApi } from '@/api/common'
import { AppRouteRecordRaw, Menu } from '@/router/types'
import { EXCEPTION_COMPONENT } from '@/router/routes/constant'
import { resetRouter } from '@/router'
// import { useMessage } from '@/hooks/web/useMessage'
import { transformObjToRoute, flatMultiLevelRoutes } from '@/router/helper/routeHelper'
import { goToLogin, removeToken } from '@/utils/request/auth'
import { cloneDeep } from 'lodash-es'
interface StateType {
  menuList: Recordable[]
  userInfo: Recordable<string>
  pageLoading: boolean
  originMenuList: Array<any>
  token: string
  currentMenuKey: number | string
}

export interface MenuType {
  children?: Array<MenuType>
  menuName: string
  menuUrl?: string
  menuCode: string
  menuLogo?: string
  enable?: boolean
  parentMenuId?: number
  menuItem?: any
  id?: number
  noShowingChildren?: boolean
}

function parseMenuList(menuList: Array<AppRouteRecordRaw>): Array<AppRouteRecordRaw> {
  return menuList.reduce((resMenuList: Array<AppRouteRecordRaw>, currentMenu: AppRouteRecordRaw) => {
    const { path, name, children, component, redirect, meta } = currentMenu

    const route: AppRouteRecordRaw = {
      path: path,
      name: name,
      meta: {
        id: meta.id,
        hideMenu: meta.hideMenu,
        title: meta.title,
        icon: meta.icon
      },
      redirect: redirect,
      component: component,
      children: []
    }
    if (children?.length && children) {
      route.children = parseMenuList(children)
    }
    resMenuList.push(route)
    return resMenuList
  }, [])
}

export const useAppStore = defineStore({
  id: 'App',
  state: (): StateType => ({
    menuList: [],
    userInfo: {},
    pageLoading: false,
    originMenuList: [],
    currentMenuKey: -1,
    token: ''
  }),
  getters: {
    getToken(): string {
      return this.token
    },
    getMenuList(): Recordable[] {
      return this.menuList
    },
    getUserInfo(): Recordable<string> {
      return this.userInfo
    }
  },
  actions: {
    setToken(token: string): void {
      this.token = token
    },
    setMenuList(menuList: Array<any>): void {
      this.menuList = menuList
    },
    setUserInfo(userInfo: Recordable<string>): void {
      this.userInfo = userInfo
      Persistent.setLocal(USER_INFO_KEY, this.userInfo)
    },
    setCurrentMenuKey(key: number | string) {
      if (key === null || key === undefined) return
      this.currentMenuKey = key
    },
    setLoading(pageLoading: boolean): void {
      this.pageLoading = pageLoading
    },
    setOriginMenuList(originMenuList: Array<any>) {
      this.originMenuList = originMenuList
    },
    async buildRouterMenu() {
      const res = await getMenuListApi({})

      const { data = [] } = res

      const cloneData = cloneDeep(data)

      this.setOriginMenuList(cloneData)
      this.setMenuList(cloneDeep(cloneData))

      // const menuList = parseMenuList(data)
      // console.log('menuList: ', menuList);

      let routeList = transformObjToRoute(data)

      routeList = flatMultiLevelRoutes(routeList)

      return routeList
    },
    /**
     * @description: 退出
     */
    async logout(goLogin = false) {
      removeToken()
      this.setUserInfo({})
      goLogin && goToLogin()
    },

    /**
     * @description: 确认退出前确认
     */
    confirmLoginOut() {
      // const { createConfirm } = useMessage()
      // createConfirm({
      //   iconType: 'warning',
      //   title: () => h('span', '温馨提醒'),
      //   content: () => h('span', '是否确认退出系统？'),
      //   onOk: async () => {
      //     await this.logout(true)
      //   }
      // })
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}
