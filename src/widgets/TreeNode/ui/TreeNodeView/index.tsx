import { useState } from 'react';
import type { TreeNodeProps } from '../../../../entities/Post';
import { cn } from '../../../../shared/utils';
import { TreeNodeViewVariants } from './variants';
import { TreeNodeItem } from '../TreeNodeItem';
import { FaFile, FaFolderClosed, FaFolderOpen } from 'react-icons/fa6';

export function TreeNodeView({ node }: TreeNodeProps) {
  const [open, setOpen] = useState(false);
  const isFolder = node.type === 'folder';
  const icon = isFolder ? (open ? <FaFolderOpen /> : <FaFolderClosed className='text-gray-600' />) : <FaFile />

  return (
    <div className={cn(TreeNodeViewVariants({}))}>
      <TreeNodeItem node={node} open={open} onClick={() => isFolder && setOpen(!open)} icon={icon}>{node.name}</TreeNodeItem>
      {isFolder && open && node.children?.map((child, idx) => (<TreeNodeView key={idx} node={child} />))}
    </div>
  );
};