import { usePostTree } from '../../../features/Post';
import { TreeNodeView } from '../../../widgets/Post';

export function Blog() {
  const data = usePostTree();
  return (
    <div>
      {data.map((node, idx) => (
        <TreeNodeView key={idx} node={node} />
      ))}
    </div>
  );
}