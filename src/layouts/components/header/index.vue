<script setup lang="ts">
import ToggleBar from './components/toggleCollapse.vue'
import MBreadCrumb from './components/breadCrumb.vue'
import RightMenuContent from './components/rightMenuContent.vue'
</script>

<template>
  <el-header class="layout-header">
    <ToggleBar />
    <MBreadCrumb />
    <RightMenuContent />
  </el-header>
</template>
<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.layout-header {
  width: 100%;
  height: $headerHeight;
  line-height: $headerHeight;
  background: $fill-blank;
  padding: 0 16px;
  display: flex;
  align-items: center;
}
</style>
