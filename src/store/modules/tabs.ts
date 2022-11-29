import { defineStore } from 'pinia'
import { store } from '@/store'

interface StateType {
  tabList: Array<any>
}

export const useTabsStore = defineStore({
  id: 'AppTabs',
  state: (): StateType => ({
    tabList: []
  }),
  getters: {
    getTabList(): Array<string> {
      return this.tabList
    }
  },
  actions: {
    setTabList(tabList: Array<any>): void {
      this.tabList = tabList
    }
  }
})

export function useTabsStoreWithOut() {
  return useTabsStore(store)
}
