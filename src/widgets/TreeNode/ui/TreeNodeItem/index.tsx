import { cn } from '../../../../shared/utils';
import { TreeNodeItemVariants } from './variants';
import { type TreeNodeItemProps } from './types';
import { Indice } from '../../../../shared/ui';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';

export function TreeNodeItem({ node, open, onClick, icon, children }: TreeNodeItemProps) {
  const isFolder = node.type === 'folder';

  return (
    <div className={cn(TreeNodeItemVariants())} onClick={onClick}>
      <button onClick={onClick} className='flex items-center gap-2 w-full'>
        <Indice icon={icon}>{children && children}</Indice>
        {isFolder ? (open ? <FaAngleDown /> : <FaAngleRight />) : null}
      </button>
    </div >
  );
}