import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: RouteMeta
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
}

export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success'
  content?: string
  dot?: boolean
}

export interface Menu {
  id?: string | number

  name: string

  icon?: string

  path: string

  paramPath?: string

  disabled?: boolean

  children?: Menu[]

  orderNo?: number

  roles?: any[]

  meta?: Partial<RouteMeta>

  tag?: MenuTag

  hideMenu?: boolean
}

export interface MenuModule {
  orderNo?: number
  menu: Menu
}

export type AppRouteModule = AppRouteRecordRaw
