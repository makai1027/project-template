import { defineStore } from 'pinia'
import type { MenuSetting } from 'types/config'
import { store } from '@/store'
import { MENU_CONFIG_KEY } from '@/enums/cacheEnum'
import { Persistent } from '@/utils/cache/persistent'

interface AppConfig {
  menuSetting: MenuSetting
}

/* const DEVICE_TYPE_KEY = 'DEVICE_TYPE'

const enum DEVICE_TYPE {
  DESKTOP = 'desktop',
  MOBILE = 'MOBILE'
} */

export const useAppConfigStore = defineStore({
  id: 'AppConfig',
  state: (): AppConfig => ({
    menuSetting: {
      collapsed: false,
      menuWidth: 120,
      withoutAnimation: true
    }
  }),
  getters: {
    getMenuSetting(): MenuSetting {
      return this.menuSetting
    }
  },
  actions: {
    setMenuSetting(menuSetting: Partial<MenuSetting>): void {
      Object.assign(this.menuSetting, menuSetting)
      Persistent.setLocal(MENU_CONFIG_KEY, this.menuSetting)
    }
  }
})

export function useAppConfigStoreWithOut() {
  return useAppConfigStore(store)
}
