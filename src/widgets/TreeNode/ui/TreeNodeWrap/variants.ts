import { cva } from 'class-variance-authority';

export const TreeNodeWrapVariants = cva(
  `
    flex flex-col gap-4
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
