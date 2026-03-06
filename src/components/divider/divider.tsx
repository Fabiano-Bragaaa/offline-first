import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

export type DividerProps = {
  className?: string;
};

export function Divider({ className }: DividerProps) {
  return <View className={twMerge('h-px bg-gray-100', className)} />;
}
