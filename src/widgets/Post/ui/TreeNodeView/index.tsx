
import { useState } from 'react';
import type { TreeNodeProps } from '../../../../entities/Post';


export const TreeNodeView: React.FC<TreeNodeProps> = ({ node }) => {
  const [open, setOpen] = useState(false);
  const isFolder = node.type === 'folder';

  return (
    <div style={{ marginLeft: 16 }}>
      <div
        style={{ cursor: isFolder ? 'pointer' : 'default' }}
        onClick={() => isFolder && setOpen(!open)}
      >
        {isFolder ? (open ? '📂' : '📁') : '📄'}{' '}
        {node.name}
      </div>
      {isFolder && open && node.children?.map((child, idx) => (
        <TreeNodeView key={idx} node={child} />
      ))}
    </div>
  );
};