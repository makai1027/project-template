// import { useMessage } from '@/hooks/web/useMessage'
import { useAppStoreWithOut } from '@/store/modules/app'
// const { createMessage } = useMessage()
// const appStore = useAppStoreWithOut()
// 创建loading类
class LoadingInstance {
  CInstance: any
  constructor() {
    this.CInstance = null
  }
  start(): void {
    // appStore.setLoading(true)
  }

  close(): void {
    // appStore.setLoading(false)
  }

  error(err: string): void {
    // createMessage.error(err)
  }
}

export default LoadingInstance
