import type { AppRouteRecordRaw } from '../types'
import { PAGE_NOT_FOUND_NAME, LAYOUT, EXCEPTION_COMPONENT, REDIRECT_NAME } from './constant'
import { PageEnum } from '@/enums/pageEnum'
// 404页面
export const PAGE_NOT_FOUND: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/:path(.*)*',
      name: PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: {
        title: 'ErrorPage',
        hideBreadcrumb: true,
        hideMenu: true
      }
    }
  ]
}

// 重定向页面用于页面刷新
export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  component: LAYOUT,
  name: 'RedirectTo',
  meta: {
    title: REDIRECT_NAME,
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: '/redirect/:path(.*)',
      name: REDIRECT_NAME,
      component: () => import('@/layouts/redirect/index'),
      meta: {
        title: REDIRECT_NAME,
        hideBreadcrumb: true
      }
    }
  ]
}

// 登录页面
export const LOGIN_ROUTE = {
  path: '/login',
  name: 'Login',
  component: () => import('@/layouts/login/index.vue'),
  meta: { title: '登录页' }
}

// 跟页面  或者 首页
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root'
  }
}

const ROOT_PAGE: AppRouteRecordRaw = {
  path: PageEnum.BASE_HOME,
  component: LAYOUT,
  name: 'root_page',
  meta: {
    title: '首页',
    hideBreadcrumb: true,
    hideMenu: true
  },
  children: [
    {
      path: PageEnum.BASE_HOME,
      name: '首页',
      component: () => import('@/layouts/components/welcome/index.vue'),
      meta: {
        title: '首页',
        hideBreadcrumb: true
      }
    }
  ]
}

export const basicRoutes = [LOGIN_ROUTE, RootRoute, ROOT_PAGE, REDIRECT_ROUTE, PAGE_NOT_FOUND]
