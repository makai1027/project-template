<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<template>
  <el-config-provider size="small" :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>
