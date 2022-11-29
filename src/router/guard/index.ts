import type { Router } from 'vue-router'
import { createProgressGuard } from './progressGuard'
import { createMenuGuard } from './menuGuard'

export function setupRouterGuard(router: Router) {
  createProgressGuard(router)
  createMenuGuard(router)
}
