import { useParams } from 'react-router';
import { TreeNodeWrap } from '../../../widgets/TreeNode';

export function Blog() {
  const { tab } = useParams<{ tab?: string }>();

  return (
    <div className='flex p-4 justify-around'>
      <section className='bg-cyan-100'>
        여기는 섹션입니다.
      </section>
      <div className='flex flex-col w-[50svw] gap-10'>
        <div>
          <h1 className='text-4xl font-bold'>/{tab}</h1>
        </div>
        <TreeNodeWrap />
      </div>
      <section className='bg-cyan-100'>
        여기는 섹션입니다.
      </section>
    </div>
  );
}