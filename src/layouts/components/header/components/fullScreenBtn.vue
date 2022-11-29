<script setup lang="ts">
const { toggle, isFullscreen } = useFullscreen()
const title = computed(() => (isFullscreen.value ? '退出全屏' : '全屏'))
</script>

<template>
  <el-tooltip :content="title" placement="bottom">
    <span class="full-screen-btn" @click="() => toggle()">
      <i-ant-design-fullscreen-exit-outlined v-if="isFullscreen" />
      <i-ant-design-fullscreen-outlined v-else />
    </span>
  </el-tooltip>
</template>
<style lang="scss" scoped>
.full-screen-btn {
  padding: 0 10px;
  font-size: 16px;
  font-weight: bold;
}
</style>
