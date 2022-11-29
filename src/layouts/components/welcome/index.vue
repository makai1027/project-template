<script setup lang="ts">
import { useAppStoreWithOut } from '@/store/modules/app'
const store = useAppStoreWithOut()
const projectTitle = computed(() => import.meta.env.VITE_GLOB_APP_TITLE)
const userInfo = computed(() => store.getUserInfo)
</script>
<template>
  <div class="content">
    <p class="title">你好，{{ userInfo.username }}！</p>
    <p class="title">欢迎使用 {{ projectTitle }}。</p>
  </div>
</template>
<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.content {
  background: $fill-blank;
  height: 100%;
  padding: 60px;
  .title {
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
