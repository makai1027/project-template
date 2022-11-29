<script lang="tsx">
import MyIcons from '@/components/Icon'
export default defineComponent({
  name: 'SidebarItem',
  props: {
    item: {
      type: Object as PropType<Recordable>,
      required: true
    }
  },
  setup(props) {
    const { item } = markRaw(props)
    let onlyOneChild: Recordable

    const hasOneShowingChild = (children: Array<Recordable>, parent: any) => {
      const showingChildren = children.filter((item: any) => {
        if (item.meta.hideMenu) {
          return false
        } else {
          onlyOneChild = item
          return true
        }
      })
      if (showingChildren.length === 1) {
        return true
      }

      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, noShowingChildren: true }
        return true
      }

      return false
    }

    const slotIcon = (item: Recordable) => {
      const { icon, title } = item
      return {
        title: () => (
          <>
            {/*<component is={icon} />*/}
            {/* <MyIcons icon={icon} /> */}
            <el-icon>
              <i-ep-eleme-filled />
            </el-icon>
            <span>{title}</span>
          </>
        )
      }
    }
    return () => (
      <>
        {!item.meta.hideMenu &&
          (hasOneShowingChild(item.children || [], item) &&
          (!onlyOneChild?.children || onlyOneChild?.noShowingChildren) ? (
            <el-menu-item index={onlyOneChild.path} route={onlyOneChild.path} v-slots={slotIcon(onlyOneChild.meta)} />
          ) : (
            <el-sub-menu index={item.path} route={item.path} v-slots={slotIcon(item.meta)}>
              {item.children?.map((child: any) => {
                return <sidebar-item item={child} />
              })}
            </el-sub-menu>
          ))}
      </>
    )
  }
})
</script>
