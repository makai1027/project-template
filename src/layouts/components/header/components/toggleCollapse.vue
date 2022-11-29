<script setup lang="ts">
import { useAppConfigStore } from '@/store/modules/config'
const store = useAppConfigStore()
const collapsed = computed<boolean>(() => store.getMenuSetting.collapsed)

const toggleClick = () => {
  store.setMenuSetting({
    collapsed: !collapsed.value
  })
}
</script>

<template>
  <div class="toggle-bar" @click="toggleClick">
    <el-icon size="20">
      <i-ep-fold v-if="!collapsed" />
      <i-ep-expand v-else />
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
@import '@/styles/variables.module.scss';
.toggle-bar {
  display: inline-block;
  width: $logoHeight;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  font-weight: bold;
}
</style>
