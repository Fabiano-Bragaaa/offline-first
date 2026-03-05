import {
  ActivityIndicator,
  TouchableOpacity,
  type TouchableOpacityProps,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Text } from '../text/text';
import { buttonContainer, buttonLabel } from './button-presets';

export type ButtonPreset = 'primary' | 'outline';

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
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isDisabled}
      className={twMerge(
        buttonContainer({ preset, disabled: isDisabled }),
        className,
      )}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={preset === 'primary' ? '#FFFFFF' : '#4F6EF7'}
        />
      ) : (
        <Text className={buttonLabel({ preset, disabled: isDisabled })}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
