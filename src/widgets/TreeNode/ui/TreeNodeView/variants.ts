import { cva } from 'class-variance-authority';

export const TreeNodeViewVariants = cva(
  `
    pl-4 rounded-xl border-gray-300
    border-1 bg-gray-100
  `,
  {
    variants: {
      variant: {
        default: '',
      },
      size: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
