import { cva } from 'class-variance-authority';
import { colors } from '@theme';

export const buttonContainer = cva(
  'flex-row items-center justify-center rounded-xl h-[50px] px-5',
  {
    variants: {
      preset: {
        primary: 'bg-primary',
        outline: 'border border-primary bg-transparent',
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
  primary: colors.surface,
  outline: colors.primary,
  destructive: colors.surface,
};

export const buttonLabel = cva('text-base font-semibold', {
    variants: {
      preset: {
        primary: 'text-white',
        outline: 'text-primary',
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
