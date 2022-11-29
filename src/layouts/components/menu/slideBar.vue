<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useAppConfigStore } from '@/store/modules/config'
import { useAppStoreWithOut } from '@/store/modules/app'
import SidebarItem from './sideBarItem.vue'
import variables from '@/styles/variables.module.scss'

const store = useAppStoreWithOut()
const store2 = useAppConfigStore()
const { currentRoute } = useRouter()
// 菜单列表
const menuList = computed(() =>
  store.getMenuList
    .map((el) => {
      if (el.children && el.children.length) {
        el.children = el.children.filter((item: Recordable) => !item.hideMenu)
      }
      return el
    })
    .filter((el) => !el.meta.hideMenu)
)

// 展开控制
const isCollapse = computed(() => store2.getMenuSetting.collapsed)
</script>

<template>
  <div class="siderbar-wrapper">
    <el-menu
      router
      :default-active="currentRoute.path"
      :background-color="variables.asideBgColor"
      :active-text-color="variables.primaryColor"
      class="el-menu-vertical-wrapper"
      :collapse="isCollapse"
      :text-color="variables.basicWhite"
    >
      <SidebarItem v-for="item in menuList" :key="item.id" :item="item" />
    </el-menu>
  </div>
</template>
<style lang="scss" scoped>
@import '@/styles/variables.module.scss';

.siderbar-wrapper {
  height: calc(100vh - $headerHeight);
  overflow: auto;
  .el-menu {
    height: 100%;
    overflow: auto;
    border-right: none;
  }
}
</style>
