import { isReactive, isRef, reactive, toRefs } from 'vue'

export interface RequestHookState {
  data: any
  loading: boolean
  error: any
}

export interface RequestHookOptions {
  manual?: boolean
  params?: any
  format?: (...arg: any) => any
  initial?: {
    loading?: boolean
    data?: any
  }
}

function setLoading(loading: any, val: any) {
  if (loading != undefined && isRef(loading)) {
    loading.value = val
  } else if (loading != undefined && isReactive(loading)) {
    loading.loading = val
  }
}

export const useAsync = async (func: Promise<any>, loading: any): Promise<any> => {
  setLoading(loading, true)

  return await func.finally(() => setLoading(loading, false))
}

type RequestHookParams = (...args: any) => Promise<any>

export const useRequest = (request: RequestHookParams, options: RequestHookOptions = {}) => {
  const initial = options?.initial
  const state = reactive<RequestHookState>({
    data: options.format ? options.format(initial?.data) : initial?.data,
    loading: initial?.loading || false,
    error: null
  })

  const setLoading = (status: boolean) => {
    state.loading = status
  }

  const run = async (...args: any) => {
    setLoading(true)
    try {
      const res = await request(...args)
      try {
        state.data = options.format ? options.format(res) : res.data
        return state.data
      } catch (error) {
        state.error = error
        return Promise.reject(error)
      }
    } catch (error) {
      state.error = error
      return Promise.reject(error)
    } finally {
      setLoading(false)
    }
  }

  if (!options.manual) {
    run(options.params)
  }

  return {
    ...toRefs(state),
    run
  }
}
