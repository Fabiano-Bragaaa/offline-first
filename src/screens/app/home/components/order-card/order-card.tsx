import { TouchableOpacity, View } from 'react-native';
import type { Order, OrderStatus } from '@domain';
import { Text } from '@components';

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Pendente',
  in_progress: 'Em andamento',
  completed: 'Concluído',
};

const STATUS_TEXT_COLOR: Record<OrderStatus, string> = {
  pending: 'text-yellow-700',
  in_progress: 'text-violet-700',
  completed: 'text-green-700',
};

export type OrderCardProps = {
  item: Order;
  onPress: () => void;
};

export function OrderCard({ item, onPress }: OrderCardProps) {
  const statusColor = STATUS_TEXT_COLOR[item.status] ?? 'text-neutral-600';

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
        <Text variant="label" className={`mt-1 ${statusColor}`}>
          {STATUS_LABEL[item.status]}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
