interface TreeNode {
  name: string;
  type: 'folder' | 'file';
  path: string;
  children?: TreeNode[];
}

interface TreeNodeProps {
  node: TreeNode;
}

export type { TreeNode, TreeNodeProps };