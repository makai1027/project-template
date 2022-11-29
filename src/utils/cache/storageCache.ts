import { isNullOrUnDef } from '@/utils/is'

export interface CreateStorageParams {
  prefixKey: string
  storage: Storage
  timeout?: Nullable<number>
}

// 创建本地存储的方法
export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage, // 默认session缓存
  timeout = null
}: Partial<CreateStorageParams> = {}) => {
  const WebStorage = class WebStorage {
    private storage: Storage
    private prefixKey?: string

    constructor() {
      this.storage = storage
      this.prefixKey = prefixKey
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toLocaleUpperCase()
    }

    set(key: string, value: any, expire: number | null = timeout) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null
      })
      this.storage.setItem(this.getKey(key), stringData)
    }

    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key))

      if (!val) return def

      try {
        const data = JSON.parse(val)

        const { value, expire } = data
        if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
          return value
        }
        this.remove(key)
      } catch (error) {
        return def
      }
    }

    remove(key: string) {
      this.storage.removeItem(this.getKey(key))
    }

    clear(): void {
      this.storage.clear()
    }
  }

  return new WebStorage()
}
