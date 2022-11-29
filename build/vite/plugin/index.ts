import { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { configHtmlPlugin } from './html'
import { configMockPlugin } from './mock'
import { configCompressPlugin } from './compress'
import { configVisualizerConfig } from './visualizer'
// import { configImageminPlugin } from './imagemin'
import svgLoader from 'vite-svg-loader'
import { configAutoImport } from './autoImport'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const {
    // VITE_USE_IMAGEMIN,
    VITE_USE_MOCK,
    VITE_USE_ANALYZE,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
  } = viteEnv

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    vue(),
    // have to
    vueJsx(),
    svgLoader()
  ]
  // 自动导入 // 导入按需加载
  vitePlugins.push(...configAutoImport())

  // 导入html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // 按需导入mockjs
  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild))

  // The following plugins only work in the production environment
  if (isBuild) {
    // 图片压缩
    // VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin())
    // 按需启用包分析
    VITE_USE_ANALYZE && vitePlugins.push(configVisualizerConfig())
    // 导入压缩
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE))
  }

  return vitePlugins
}
