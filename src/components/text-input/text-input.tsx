import { useRef } from 'react';
import {
  Pressable,
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
  View,
} from 'react-native';
import { twMerge } from 'tailwind-merge';
import { colors } from '@theme';

import { Text } from '../text/text';

export type TextInputProps = RNTextInputProps & {
    errorMessage?: string;
  containerClassName?: string;
};

export function TextInput({
  errorMessage,
  containerClassName,
  className,
  ...textInputProps
}: TextInputProps) {
  const inputRef = useRef<RNTextInput>(null);

  function focusInput() {
    inputRef.current?.focus();
  }

  return (
    <Pressable onPress={focusInput}>
      <View
        className={twMerge(
          'flex-row items-center min-h-[48px] bg-neutral-50 rounded-xl border-2 px-3 py-2.5',
          errorMessage ? 'border-red-400' : 'border-neutral-300',
          containerClassName,
        )}
      >
        <RNTextInput
          ref={inputRef}
          autoCapitalize="none"
          placeholderTextColor={colors.inputPlaceholder}
          className={twMerge('flex-1 min-w-0 p-0 text-base text-neutral-900', className)}
          {...textInputProps}
        />
      </View>

      {errorMessage && (
        <Text variant="error" className="mt-1">
          {errorMessage}
        </Text>
      )}
    </Pressable>
  );
}
