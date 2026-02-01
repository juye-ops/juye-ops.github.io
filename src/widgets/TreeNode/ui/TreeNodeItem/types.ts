import { type VariantProps } from 'class-variance-authority';
import { type TreeNodeItemVariants } from './variants';
import type { TreeNode } from '../../../../entities/Post';

export interface TreeNodeItemProps extends VariantProps<typeof TreeNodeItemVariants> {
	node: TreeNode
	open: boolean;
	onClick?: () => void;
	icon?: React.ReactNode;
	children?: React.ReactNode;
}