<template>
  <el-main class="project-main-wrapper">
    <div class="router-wrapper">
      <RouterView>
        <template #default="{ Component, route }">
          <keep-alive v-if="Component && route.meta.keepAlive">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
          <component v-else :is="Component" :key="route.fullPath" />
        </template>
      </RouterView>
    </div>
  </el-main>
</template>

<style lang="sass" scoped>
@import '@/styles/variables.module.scss'
.project-main-wrapper
  padding: 6px
  height: calc(100vh - $headerHeight)
  overflow: hidden
  .router-wrapper
    width: 100%
    height: 100%
    background: $fill-blank
    overflow: auto
</style>
