import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

export const configAutoImport = () => {
  return [
    AutoImport({
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        }),
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: 'types/auto-imports.d.ts'
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          // enabledCollections: ['ep']
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      dts: true,
      extensions: ['vue'],
      dirs: ['src/components']
    }),
    Icons({
      autoInstall: true
    })
  ]
}
