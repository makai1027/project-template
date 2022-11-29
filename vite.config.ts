import type { UserConfig, ConfigEnv } from 'vite'
import { loadEnv } from 'vite'
import { resolve } from 'path'
import { createProxy } from './build/vite/proxy'
import { wrapperEnv } from './build/utils'
import { createVitePlugins } from './build/vite/plugin'
import { OUTPUT_DIR } from './build/constant'

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  // 设置全局process，否则项目中无法使用process
  const root = process.cwd()

  // 根据当前环境的启动命令，获取环境参数，用来获取环境的配置信息
  const env = loadEnv(mode, root)

  // 将env的配置数据进行转化
  const viteEnv = wrapperEnv(env)

  // 解构赋值参数
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv

  // 判断是否是打包环境
  const isBuild = command === 'build'

  return {
    // 默认就是 /
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        '@views': pathResolve('./src/views'),
        '@': pathResolve('./src')
      }
    },
    server: {
      https: false,
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY)
    },
    css: {
      preprocessorOptions: {}
    },
    // 打包时移除 无用的打印
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      brotliSize: false,
      chunkSizeWarningLimit: 2000
    },
    // 引入按需引用的插件
    plugins: createVitePlugins(viteEnv, isBuild),
    // 需要预编译的插件
    optimizeDeps: {
      include: [],
      exclude: []
    }
  }
}
