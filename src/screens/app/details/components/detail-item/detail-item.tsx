import { View } from 'react-native';
import { Text } from '@components';

export type DetailItemProps = {
  label: string;
  children: React.ReactNode;
};

export function DetailItem({ label, children }: DetailItemProps) {
  return (
    <View className="gap-1">
      <Text variant="label" className="text-neutral-400 uppercase tracking-wide">
        {label}
      </Text>
      <Text variant="body" className="text-neutral-700">
        {children}
      </Text>
    </View>
  );
}
