<script setup lang="ts">
import { useRouter, RouteLocationMatched } from 'vue-router'
import Icons from '@/components/Icon/index'
import { useAppStoreWithOut } from '@/store/modules/app'
import { cloneDeep } from 'lodash-es'

const store = useAppStoreWithOut()
const { currentRoute } = useRouter()
const menus = computed(() => store.getMenuList)
const routeMatched = ref<Recordable[]>([])

// 树形结构处理并返回路径
const treeFindPath = (
  tree: Recordable[],
  func: (value: Recordable) => boolean,
  result: Recordable[] = []
): Recordable[] => {
  if (!tree || !tree.length) return []
  for (const data of tree) {
    result.push(data)
    if (func(data)) return result
    if (data.children) {
      const findChild = treeFindPath(data.children, func, result)
      if (findChild?.length) return findChild
    }
    result.pop()
  }
  return []
}

// 控制是否是link
const hasRedirect = (routes: RouteLocationMatched[], route: RouteLocationMatched) => {
  if (routes.indexOf(route) === routes.length - 1) {
    return false
  }
  return true
}

watchEffect(async () => {
  // 如果是重定向不处理
  if (currentRoute.value.name === 'Redirect') return
  const { meta } = currentRoute.value
  const mp = treeFindPath(cloneDeep(menus.value), (node) => node.meta.id === meta.id)
  routeMatched.value = []
  for (let k = 0; k < mp.length; k++) {
    const el = mp[k]
    if (el.children) {
      el.children = el.children.filter((item: Recordable) => !item.meta.hideMenu)
    }
    routeMatched.value.push(el)
  }
})
</script>

<template>
  <div class="navbar-breadcrumb">
    <el-breadcrumb :routes="routeMatched">
      <template #itemRender="{ route, routes }">
        <Icons v-if="route.meta.icon" :iconName="route.meta.icon" />
        <router-link v-if="hasRedirect(routes, route)" :to="route.path">{{ route.name }}</router-link>
        <span v-else>{{ route.name }}</span>
      </template>
    </el-breadcrumb>
  </div>
</template>
<style lang="scss" scoped>
.navbar-breadcrumb {
  display: inline-block;
}
</style>
