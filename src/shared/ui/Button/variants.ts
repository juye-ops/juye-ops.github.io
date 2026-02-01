import { cva } from 'class-variance-authority';

export const ButtonVariants = cva(
  `
  text-3xl text-black text-center
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
        xl: 'px-8 py-4 text-4xl font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);
