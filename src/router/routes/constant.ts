export const REDIRECT_NAME = 'Redirect'

export const PARENT_LAYOUT_NAME = 'ParentLayout'

export const PAGE_NOT_FOUND_NAME = 'PageNotFound'

/**
 * @description: 默认容器
 */
export const LAYOUT = () => import('@/layouts/index.vue')

// 404页面
export const EXCEPTION_COMPONENT = () => import('@/layouts/components/error/404')

/**
 * @description: 获取父容器
 */
export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: PARENT_LAYOUT_NAME
      })
    })
}
