<template>
  <div class="login-wrapper">
    <div class="login-content">
      <el-form class="login-form" ref="formRef" :model="formState" autocomplete="off" :rules="rules" status-icon>
        <h2 class="login-title">{{ platformName }}</h2>
        <el-form-item prop="username">
          <el-input placeholder="用户名" size="large" v-model="formState.username" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" size="large" v-model="formState.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" auto-insert-space size="large" @click="onFinish">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login } from '@/api/common'
import { Login } from '@/api/common/models'
import { useRequest } from '@/hooks/useRequest'
import { useAppStoreWithOut } from '@/store/modules/app'
import { setToken } from '@/utils/request/auth'
import { Ribbon } from '@/utils/ribbon'

const appStorage = useAppStoreWithOut()
const router = useRouter()
const formRef = ref()
const formState = reactive<Login>({
  username: '',
  password: ''
})
const ribbon = new Ribbon()
const initRobbin = async () => {
  ribbon.createCanvas()
  ribbon.redraw()
}

const rules = {
  username: [{ required: true, message: '请输入用户名!' }],
  password: [{ required: true, message: '请输入密码!' }]
}

const platformName = import.meta.env.VITE_GLOB_APP_TITLE

const { data, loading, run: loginRun } = useRequest(login, { manual: true })

const onFinish = async () => {
  try {
    formRef.value.validate()
    const data = await loginRun(formState)
    appStorage.setUserInfo(data)
    setToken(data.token)
    router.push('/')
  } catch {}
}
onMounted(() => {
  initRobbin()
})
</script>

<style lang="scss" scoped>
.login-wrapper {
  min-height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-content {
    margin: 0 auto;
    width: 400px;

    .login-title {
      margin-bottom: 30px;
      text-align: center;
    }

    .login-form {
      width: 100%;
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
