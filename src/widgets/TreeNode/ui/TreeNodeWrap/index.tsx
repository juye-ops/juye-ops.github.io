import { cn } from '../../../../shared/utils';
import { TreeNodeWrapVariants } from './variants';
import { TreeNodeView } from '../TreeNodeView';
import { usePostTree } from '../../../../features/Post';

export function TreeNodeWrap() {
  const data = usePostTree();
  return (
    <div className={cn(TreeNodeWrapVariants())}>
      {data.map((node, idx) => (
        <TreeNodeView key={idx} node={node} />
      ))}
    </div>
  );
};