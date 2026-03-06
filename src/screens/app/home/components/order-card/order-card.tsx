import { TouchableOpacity, View } from 'react-native';
import type { Order, OrderStatus } from '@domain';
import { Text } from '@components';

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Pendente',
  in_progress: 'Em andamento',
  completed: 'Concluído',
};

export type OrderCardProps = {
  item: Order;
  onPress: () => void;
};

export function OrderCard({ item, onPress }: OrderCardProps) {
  return (
    <TouchableOpacity
      className="bg-white rounded-xl p-3.5 flex-row items-center border border-gray-200"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-1">
        <Text variant="body" className="font-semibold text-neutral-900">
          {item.title}
        </Text>
        <Text variant="caption" className="text-neutral-600 mt-0.5">
          {item.description}
        </Text>
        <Text variant="label" className="text-primary mt-1">
          {STATUS_LABEL[item.status]}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
