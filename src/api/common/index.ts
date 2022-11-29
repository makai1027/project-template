import type { Login } from './models/index'
import axios from '@/utils/request/axios'

enum Api {
  login = '/login',
  logout = '/logout',
  getUserInfo = '/getUserInfo',
  menuList = '/menu/list'
}

class CommonApi extends axios {
  login(data: Login) {
    return this.post({ url: Api.login, data })
  }

  getMenuList(data: Login) {
    return this.post({ url: Api.menuList, data })
  }
}
const rp = new CommonApi()

// 登录
export const login = (data: Login): Promise<any> => rp.login(data)

// 获取菜单
export const getMenuListApi = (data: any): Promise<any> => rp.getMenuList(data)
