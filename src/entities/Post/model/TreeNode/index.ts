interface TreeNode {
  name: string;
  type: 'folder' | 'file';
  children?: TreeNode[];
}

interface TreeNodeProps {
  node: TreeNode;
}

export type { TreeNode, TreeNodeProps };