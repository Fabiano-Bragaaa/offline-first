import { twMerge } from 'tailwind-merge';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

type TextVariant =
  | 'heading'
  | 'subheading'
  | 'body'
  | 'caption'
  | 'label'
  | 'error';

const variantClasses: Record<TextVariant, string> = {
  heading: 'text-[22px] font-bold text-neutral-900',
  subheading: 'text-lg font-semibold text-neutral-800',
  body: 'text-base text-neutral-700',
  caption: 'text-sm text-neutral-500',
  label: 'text-xs font-medium text-neutral-500',
  error: 'text-sm font-medium text-red-500',
};

export type TextProps = RNTextProps & {
  variant?: TextVariant;
};

export function Text({ variant = 'body', className, ...rest }: TextProps) {
  return (
    <RNText
      className={twMerge(variantClasses[variant], className)}
      {...rest}
    />
  );
}
