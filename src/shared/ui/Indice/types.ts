import { type VariantProps } from 'class-variance-authority';
import { type IndiceVariants } from './variants';

export interface IndiceProps extends VariantProps<typeof IndiceVariants> {
	className?: string;
	children?: React.ReactNode;
	onClick?: () => void;
	icon?: React.ReactNode;
	open?: boolean;
}