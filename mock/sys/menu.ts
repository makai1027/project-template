import { resultSuccess, resultError, getRequestToken, requestParams } from '../_util'
import { MockMethod } from 'vite-plugin-mock'

const menuList = [
  {
    path: '/route1',
    name: 'Page1',
    redirect: '/route1/route2',
    meta: {
      title: '页面-1',
      hideBreadcrumb: false,
      hideMenu: false,
      icon: 'ElemeFilled',
      id: 1
    },
    component: 'LAYOUT',
    children: [
      {
        path: '/route1/route2',
        name: 'Page2',
        meta: {
          title: '页面-2',
          hideBreadcrumb: false,
          hideMenu: false,
          icon: 'ElemeFilled',
          id: 2
        },
        component: '/dashboard/list/index'
      },
      {
        path: '/route1/route3',
        name: 'Page3',
        meta: {
          title: '页面-3',
          hideBreadcrumb: false,
          hideMenu: false,
          icon: 'ElemeFilled',
          id: 5
        },
        component: '/dashboard/detail/index'
      },
      {
        path: '/route1/route7',
        name: 'Page7',
        meta: {
          title: '页面-7',
          hideBreadcrumb: false,
          hideMenu: false,
          icon: 'ElemeFilled',
          id: 7
        },
        component: '/dashboard/detail/index'
      },
      {
        path: '/route1/route8',
        name: 'Page8',
        meta: {
          title: '页面-8',
          hideBreadcrumb: false,
          hideMenu: false,
          icon: 'ElemeFilled',
          id: 8
        },
        component: '/dashboard/detail/index'
      }
    ]
  },
  {
    path: '/route4',
    name: 'Page4',
    meta: {
      title: '页面-4',
      hideBreadcrumb: false,
      hideMenu: false,
      icon: 'ElemeFilled',
      id: 3
    },
    component: 'LAYOUT',
    children: [
      {
        path: '/route4/route5',
        name: 'Page5',
        meta: {
          title: '页面-5',
          hideBreadcrumb: false,
          hideMenu: false,
          icon: 'ElemeFilled',
          id: 4
        },
        component: '/table/list/index'
      },
      {
        path: '/route4/route6',
        name: 'Page6',
        meta: {
          title: '页面-6',
          hideBreadcrumb: false,
          hideMenu: false,
          icon: 'ElemeFilled',
          id: 6
        },
        component: '/table/detail/index'
      },
      {
        path: '/route4/route9',
        name: 'Page9',
        meta: {
          title: '页面-9',
          hideBreadcrumb: false,
          hideMenu: true,
          icon: 'ElemeFilled',
          id: 9
        },
        component: '/table/hide/index'
      }
    ]
  }
]

export default [
  {
    url: '/api/menu/list',
    timeout: 1000,
    method: 'post',
    response: (request: requestParams) => {
      return resultSuccess(menuList)
    }
  },
  {
    url: '/api/login',
    timeout: 1000,
    method: 'post',
    response: (request: requestParams) => {
      const { body } = request
      return resultSuccess(
        Object.assign(body, {
          token: '@guid'
        })
      )
    }
  }
] as MockMethod[]
