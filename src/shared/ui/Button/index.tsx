import { cn } from '../../utils/cn';
import { ButtonVariants } from './variants';
import { type ButtonProps } from './types';

export function Button({ variant, size, className, onClick, children }: ButtonProps) {		
	return (
		<div className={cn(ButtonVariants({ variant, size, className }))}>
			<button onClick={onClick}>
				{children && children}
			</button>
		</div>
	);
}