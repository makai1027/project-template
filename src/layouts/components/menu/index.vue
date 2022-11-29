<script setup lang="ts">
import Logo from './logo.vue'
import SlideBar from './slideBar.vue'
import variables from '@/styles/variables.module.scss'
import { useAppConfigStore } from '@/store/modules/config'
const store = useAppConfigStore()
const collapsed = computed<boolean>(() => store.getMenuSetting.collapsed)
</script>

<template>
  <el-aside class="aside-wrapper" :width="collapsed ? variables.asideCollapseWidth : variables.asideWidth">
    <Logo />
    <SlideBar />
  </el-aside>
</template>

<style lang="sass" scoped>
@import '@/styles/variables.module.scss'
.aside-wrapper
  will-change: width
  overflow-x: hidden
  transition: width 0.1s ease-in
  background: $aside-bg-color
</style>
