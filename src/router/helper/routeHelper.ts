import type { AppRouteRecordRaw } from '@/router/types'
import type { Router, RouteRecordNormalized } from 'vue-router'

import { getParentLayout, LAYOUT, EXCEPTION_COMPONENT } from '@/router/routes/constant'
import { cloneDeep, omit } from 'lodash-es'
import { createRouter, createWebHashHistory } from 'vue-router'

export type LayoutMapKey = 'LAYOUT'
// const IFRAME = () => import('/@/views/sys/iframe/FrameBlank.vue');

const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>()

LayoutMap.set('LAYOUT', LAYOUT)
// LayoutMap.set('IFRAME', IFRAME);

let dynamicViewsModules: Record<string, () => Promise<Recordable>>

// 组件倒入
function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/*.{vue,tsx}')
  if (!routes) return
  routes.forEach((item) => {
    /* if (!item.component && item.meta?.frameSrc) {
      item.component = 'IFRAME';
    } */
    const { component, name } = item
    const { children } = item
    if (component) {
      const layoutFound = LayoutMap.get(component.toUpperCase())
      if (layoutFound) {
        item.component = layoutFound
      } else {
        item.component = dynamicImport(dynamicViewsModules, component as string)
      }
    } else if (name) {
      item.component = getParentLayout()
    }
    children && asyncImportRoute(children)
  })
}

function dynamicImport(dynamicViewsModules: Record<string, () => Promise<Recordable>>, component: string) {
  const keys = Object.keys(dynamicViewsModules)
  const matchKeys = keys.filter((key) => {
    const k = key.replace('../../views', '')
    const startFlag = component.startsWith('/')
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx')
    const startIndex = startFlag ? 0 : 1
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.')
    return k.substring(startIndex, lastIndex) === component
  })
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
  } else if (matchKeys?.length > 1) {
    console.warn('请不要创建当前目录下与.vue和.tsx文件同名文件。')
    return
  } else {
    console.warn('在src/views/下找不到`' + component + '.vue` 或 `' + component + '.tsx`, 请自行创建!')
    return EXCEPTION_COMPONENT
  }
}

// 后端返回接口转换
export function transformObjToRoute<T = AppRouteRecordRaw>(routeList: AppRouteRecordRaw[]): T[] {
  routeList.forEach((route) => {
    const component = route.component as string
    if (component) {
      if (component.toUpperCase() === 'LAYOUT') {
        route.component = LayoutMap.get(component.toUpperCase())
      } else {
        route.children = [cloneDeep(route)]
        route.component = LAYOUT
        route.name = `${route.name}Parent`
        route.path = ''
        const meta = route.meta || {}
        meta.single = true
        meta.affix = false
        route.meta = meta
      }
    } else {
      console.warn('请正确配置路由：' + route?.name + '的component属性')
    }
    route.children && asyncImportRoute(route.children)
  })
  return routeList as unknown as T[]
}

/**
 * 打平路由为两层
 */
export function flatMultiLevelRoutes(routeModules: AppRouteRecordRaw[]) {
  const modules: AppRouteRecordRaw[] = cloneDeep(routeModules)
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index]
    if (!isMultipleRoute(routeModule)) {
      continue
    }
    promoteRouteLevel(routeModule)
  }
  return modules
}

function promoteRouteLevel(routeModule: AppRouteRecordRaw) {
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory()
  })

  const routes = router.getRoutes()
  addToChildren(routes, routeModule.children || [], routeModule)
  router = null

  routeModule.children = routeModule.children?.map((item) => omit(item, 'children'))
}

function addToChildren(routes: RouteRecordNormalized[], children: AppRouteRecordRaw[], routeModule: AppRouteRecordRaw) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const route = routes.find((item) => item.name === child.name)
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteRecordRaw)
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}

function isMultipleRoute(routeModule: AppRouteRecordRaw) {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false
  }

  const children = routeModule.children

  let flag = false
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}
