import { TouchableOpacity, View } from 'react-native';
import { Text } from '../text/text';

export type OptionPickerOption<T> = {
  value: T;
  label: string;
};

export type OptionPickerProps<T extends string> = {
  options: OptionPickerOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  label?: string;
};

export function OptionPicker<T extends string>({
  options,
  value,
  onValueChange,
  label,
}: OptionPickerProps<T>) {
  return (
    <View className="gap-4">
      {label ? (
        <Text variant="label" className="text-neutral-500 uppercase tracking-wide">
          {label}
        </Text>
      ) : null}
      <View className="flex-row flex-wrap gap-2 mb-2">
        {options.map(opt => {
          const selected = value === opt.value;
          return (
            <TouchableOpacity
              key={opt.value}
              onPress={() => onValueChange(opt.value)}
              className={`rounded-lg px-3 py-2 border ${
                selected ? 'bg-primaryLight border-primary' : 'bg-neutral-50 border-gray-200'
              }`}
              activeOpacity={0.7}
            >
              <Text
                variant="body"
                className={selected ? 'font-semibold text-primary' : 'text-neutral-600'}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
