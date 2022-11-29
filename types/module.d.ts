/// <reference types="vite/client" />
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const Component: DefineComponent<{}, {}, any>
  export default Component
}

declare module 'ant-design-vue/dist/theme' {
  export { getThemeVariables }
}
