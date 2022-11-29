<script setup lang="ts">
import FullScreenBtn from './fullScreenBtn.vue'
import UserInfoMenu from './userInfoMenu.vue'
</script>
<template>
  <div class="right-menu-content">
    <FullScreenBtn class="toolbar-item" />
    <UserInfoMenu class="toolbar-item" />
  </div>
</template>
<style lang="scss" scoped>
.right-menu-content {
  flex: 1;
  display: flex;
  justify-content: right;
  align-items: center;
}
</style>
