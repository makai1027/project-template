<script setup lang="ts">
import { useAppConfigStore } from '@/store/modules/config'
import { useRouter } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

const router = useRouter()
const store = useAppConfigStore()
const title = computed(() => import.meta.env.VITE_GLOB_APP_TITLE)
const collapsed = computed<boolean>(() => store.getMenuSetting.collapsed)

const goHome = () => {
  router.push(PageEnum.BASE_HOME)
}
</script>

<template>
  <div :class="['logo-wrapper', collapsed && 'collapsed']" @click="goHome">
    <div class="logo"></div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.logo-wrapper {
  width: 100%;
  height: $headerHeight;
  display: flex;
  padding: 0 15px 0 22px;
  align-items: center;
  cursor: pointer;
  background: $aside-bg-color;
  .logo {
    flex: 0 0 $logoHeight;
    width: $logoHeight;
    height: $logoHeight;
    background-image: url('../../../assets/avatar.png');
    background-repeat: no-repeat;
    background-size: $logoHeight $logoHeight;
  }
  .title {
    flex: 1;
    width: 100%;
    font-size: 16px;
    color: $basic-white;
    font-weight: bold;
    padding-left: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
