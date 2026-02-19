import { cn } from '../../utils/cn';
import { IndiceVariants } from './variants';
import { type IndiceProps } from './types';
import { useNavigate } from 'react-router';

export function Indice({ variant, size, className, children, onClick, icon }: IndiceProps) {
  const navigate = useNavigate();

  return (
    <li className={cn(IndiceVariants({ variant, size, className }))} onClick={onClick}>
      <i>{icon}</i>
      <button className='text-left cursor-pointer hover:underline' onClick={() => navigate("/post/"+String(children))}>{children && children}</button>
    </li>
  );
}