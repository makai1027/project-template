/** @type Icons
 * comment 当前组件仅为了保证菜单所需的图标 按需加载
 * 出此下策，望理解
 * 如需添加其他的菜单请再次添加
 * 期待大佬力挽狂澜
 * 我觉得你说的对 ~
 */
export const MyIcons: { [k: string]: JSX.Element } = {
  ElemeFilled: <i-ep-eleme-filled />
}
export default defineComponent({
  name: 'IconFont',
  props: {
    icon: {
      type: String as PropType<string>,
      default: ''
    }
  },
  setup(props) {
    return () => <el-icon>{MyIcons[props.icon]}</el-icon>
  }
})
