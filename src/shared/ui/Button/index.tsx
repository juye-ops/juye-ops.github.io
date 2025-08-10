import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils/cn';

export const ButtonVariants = cva(
	`
	text-3xl text-gray-600 text-center
	border-none py-2.5 px-5
	transition-all duration-300 ease-in-out
  `,
	{
		variants: {
			variant: {
				default: '',
				grey: 'bg-gray-150 text-gray-950',
				red: 'bg-red-600',
			},
			size: {
				default: '',
				md: 'px-4 py-2',
				lg: 'px-6 py-3 text-lg',
				xl: 'px-8 py-4 text-4xl',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

interface ButtonProps extends VariantProps<typeof ButtonVariants> {
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void;
}

export function Button({ variant, size, className, onClick, children }: ButtonProps) {		
	return (
		<div className={cn(ButtonVariants({ variant, size, className }))}>
			<button onClick={onClick}>
				{children && children}
			</button>
		</div>
	);
}