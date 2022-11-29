<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import AvatarPng from '@/assets/avatar.png'
const store = useAppStore()
const userInfo = computed(() => store.getUserInfo)

const menuClick = (command: string) => {
  switch (command) {
    case 'layout':
      // 执行layout退出
      store.confirmLoginOut()
      break

    default:
      break
  }
}
</script>

<template>
  <el-dropdown @command="menuClick">
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="layout">
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
    <div class="avatar-box">
      <el-avatar :size="32" :src="AvatarPng" />
      <span class="name">
        {{ userInfo.username || '未知用户' }}
      </span>
    </div>
  </el-dropdown>
</template>
<style lang="scss" scoped>
.avatar-box {
  display: flex;
  align-items: center;
  .ant-avatar {
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    max-width: 150px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
