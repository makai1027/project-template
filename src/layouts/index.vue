<script setup lang="ts">
import MyHeader from './components/header/index.vue'
import LayoutContent from './components/content/index.vue'
import SlideMenu from './components/menu/index.vue'
</script>
<template>
  <el-container class="project-wrapper">
    <SlideMenu />
    <el-container class="content-wrapper">
      <MyHeader />
      <LayoutContent />
    </el-container>
  </el-container>
</template>
<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.project-wrapper {
  .content-wrapper {
    flex-flow: column;
    height: 100vh;
    background-color: $fill-base;
    overflow: hidden;
  }
}
</style>
