import { Persistent } from '@/utils/cache/persistent'
import { router } from '@/router'
import { PLATFORM_TOKEN_KEY } from '@/enums/cacheEnum'
import { PageEnum } from '@/enums/pageEnum'

export function setToken(token: string) {
  Persistent.setLocal(PLATFORM_TOKEN_KEY, token, true)
}

export function getToken() {
  const token = Persistent.getLocal(PLATFORM_TOKEN_KEY)
  return token as string
}

export function removeToken() {
  Persistent.removeLocal(PLATFORM_TOKEN_KEY, true)
}

// 重新验证
export const goToLogin = (): void => {
  router.push(PageEnum.BASE_LOGIN)
}
