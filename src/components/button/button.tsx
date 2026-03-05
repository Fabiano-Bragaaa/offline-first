import {
  ActivityIndicator,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Text } from '../text/text';
import { buttonContainer, buttonIndicatorColor, buttonLabel } from './button-presets';

export type ButtonPreset = 'primary' | 'outline' | 'destructive';

export type ButtonProps = TouchableOpacityProps & {
  title: string;
  preset?: ButtonPreset;
  loading?: boolean;
};

export function Button({
  title,
  preset = 'primary',
  loading = false,
  disabled = false,
  className,
  ...buttonProps
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const indicatorColor = buttonIndicatorColor[preset];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isDisabled}
      className={twMerge(
        buttonContainer({ preset, disabled: isDisabled }),
        className,
      )}
      {...buttonProps}
    >
      {loading ? (
        <ActivityIndicator color={indicatorColor} />
      ) : (
        <Text className={buttonLabel({ preset, disabled: isDisabled })}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
