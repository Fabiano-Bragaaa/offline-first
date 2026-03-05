import { cva } from 'class-variance-authority';

export const buttonContainer = cva(
  'flex-row items-center justify-center rounded-xl h-[50px] px-5',
  {
    variants: {
      preset: {
        primary: 'bg-[#7C3AED]',
        outline: 'border border-[#7C3AED] bg-transparent',
        destructive: 'bg-red-500',
      },
      disabled: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      { preset: 'primary', disabled: true, class: 'bg-neutral-300' },
      { preset: 'outline', disabled: true, class: 'border-neutral-300' },
      { preset: 'destructive', disabled: true, class: 'bg-neutral-300' },
    ],
    defaultVariants: {
      preset: 'primary',
      disabled: false,
    },
  },
);

export const buttonIndicatorColor: Record<string, string> = {
  primary: '#FFFFFF',
  outline: '#7C3AED',
  destructive: '#FFFFFF',
};

export const buttonLabel = cva('text-base font-semibold', {
    variants: {
      preset: {
        primary: 'text-white',
        outline: 'text-[#7C3AED]',
        destructive: 'text-white',
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
