import { Persistent } from '@/utils/cache/persistent'
import { USER_INFO_KEY, PLATFORM_TOKEN_KEY } from '@/enums/cacheEnum'
import { useAppStore } from '@/store/modules/app'

export const setupSet = () => {
  const store = useAppStore()
  store.setUserInfo(Persistent.getLocal(USER_INFO_KEY) ?? {})
  store.setToken(Persistent.getLocal(PLATFORM_TOKEN_KEY) ?? '')
}
