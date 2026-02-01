import { type VariantProps } from 'class-variance-authority';
import { type CardVariants } from './variants';

export interface CardProps extends VariantProps<typeof CardVariants> {
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void;
}