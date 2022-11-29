import { debounce } from 'lodash-es'
import './index.scss'

export default defineComponent({
  name: 'Ellipsis',
  props: {
    content: {
      type: [String, Number, Boolean],
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'top'
    }
  },
  setup(props) {
    const disabled = ref<boolean>(false)
    const parentDom = ref()
    const spanDom = ref()
    const content = computed(() => props.content)
    function calHandler() {
      const pWidth = parentDom.value?.clientWidth
      const sWidth = spanDom.value?.offsetWidth
      disabled.value = sWidth <= pWidth
    }
    watch(
      () => content.value,
      debounce(() => calHandler(), 200)
    )

    useResizeObserver(
      document.body,
      debounce(() => calHandler(), 200)
    )
    onMounted(() => {
      calHandler()
    })
    return () => (
      <>
        {!disabled.value && (
          <el-tooltip
            class="data-lite-ellipsis"
            placement={props.placement}
            v-slots={{
              title: () => <span>{content.value}</span>
            }}
          >
            <div ref={parentDom} class="content-middle">
              <span class="text-box" ref={spanDom}>
                {content.value}
              </span>
            </div>
          </el-tooltip>
        )}
        {disabled.value && (
          <div ref={parentDom} class="data-lite-ellipsis content-middle">
            <span class="text-box" ref={spanDom}>
              {content.value}
            </span>
          </div>
        )}
      </>
    )
  }
})
