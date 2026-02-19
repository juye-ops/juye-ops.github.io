import { type VariantProps } from 'class-variance-authority';
import { type ButtonVariants } from './variants';

export interface ButtonProps extends VariantProps<typeof ButtonVariants> {
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void;
}