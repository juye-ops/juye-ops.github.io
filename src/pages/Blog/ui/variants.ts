import { cva } from 'class-variance-authority';

export const BlogVariants = cva(
  `
    hover:bg-gray-400
    border-1  border-gray-400
    flex items-center gap-2
  `,
  {
    variants: {
      variant: {
        default: '',
        folder: 'bg-gray-300',
        file: 'bg-gray-100',
      },
      size: {
        default: '',
        file: 'pl-10 py-2',
        folder: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
