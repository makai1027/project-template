import { createApp } from 'vue'
import 'normalize.css/normalize.css'
import '@/styles/index.scss'
import App from './App.vue'
import { setupStore } from '@/store'
import { setupRouter } from '@/router/index'
import { addWaterMarker } from '@/utils/addWaterMark'
import { setupRouterGuard } from '@/router/guard/index'
import { setupSet } from '@/setting/initLocalSet'
import { router } from '@/router'
import 'virtual:windi.css'

async function init() {
  const app = createApp(App)

  // 注册状态管理
  setupStore(app)
  // 注册路由
  setupRouter(app)
  // 注册路由守卫
  setupRouterGuard(router)
  // 同步local数据，备份数据
  setupSet()

  addWaterMarker(import.meta.env.VITE_GLOB_APP_TITLE, false)
  app.mount('#app')
}

init()
