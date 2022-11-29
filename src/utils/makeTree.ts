declare type nodeKey = string | number
export interface TreeNodeState {
  id: number
  parentId: number
  fileName: string
  showFileName: string
  fileFolderId: string
  fileFolderType: number
  showFileType: number
  fileOwner: string
  fileOwnerCn: string
  showFileLastUpdateTime: string
  fileNodeType: number
  slots?: Recordable
  disabled?: boolean
  children?: TreeNodeState[]
  nodeKey: nodeKey
  name: string
  level?: number
  loading?: boolean
  expanded?: boolean
  selected?: boolean
  checked?: boolean
  hasChildren?: boolean
  parentKey?: nodeKey | null
  nodeId: any
}

export function makeTree(treeNodes: TreeNodeState[]): TreeNodeState[] {
  // 提前生成节点查找表。
  // 如果明确节点是顺序可以保证先父后子，可以省去这次遍历，在后面边遍历过程中填充查找表
  const nodesMap = new Map<number, TreeNodeState>(treeNodes.map((node) => [node.id, node]))

  // 引入虚拟根节点来统一实现 parent 始终有效，避免空判断
  const virtualRoot = {} as Partial<TreeNodeState>
  treeNodes.forEach((node, i) => {
    node.name = node.showFileName
    node.nodeKey = node.id
    node.nodeId = node.id
    node.parentKey = node.parentId

    const parent = nodesMap.get(node.parentId) ?? virtualRoot
    ;(parent.children ??= []).push(node)

    if (parent.children) {
      parent.hasChildren = true
    }
  })

  return virtualRoot.children ?? []
}

export function transformToArrayFormat(nodes: TreeNodeState[]) {
  if (!nodes) return []
  let r: TreeNodeState[] = []
  if (Array.isArray(nodes)) {
    for (let i = 0, l = nodes.length; i < l; i++) {
      const node = nodes[i]
      _do(node)
    }
  } else {
    _do(nodes)
  }
  return r

  function _do(_node: TreeNodeState) {
    r.push(_node)
    const children = _node.children
    if (children) {
      r = r.concat(transformToArrayFormat(children))
    }
  }
}
