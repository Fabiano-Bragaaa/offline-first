import { cva } from 'class-variance-authority';

export const buttonContainer = cva(
  'flex-row items-center justify-center rounded-xl h-[50px] px-5',
  {
    variants: {
      preset: {
        primary: 'bg-[#4F6EF7]',
        outline: 'border border-[#4F6EF7] bg-transparent',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { preset: 'primary', disabled: true, class: 'bg-neutral-300' },
      { preset: 'outline', disabled: true, class: 'border-neutral-300' },
    ],
    defaultVariants: {
      preset: 'primary',
      disabled: false,
    },
  },
);

export const buttonLabel = cva('text-base font-semibold', {
  variants: {
    preset: {
      primary: 'text-white',
      outline: 'text-[#4F6EF7]',
    },
    disabled: {
      true: 'text-neutral-400',
      false: '',
    },
  },
  defaultVariants: {
    preset: 'primary',
    disabled: false,
  },
});
