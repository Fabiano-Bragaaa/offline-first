import { View } from 'react-native';
import { Text } from '@components';
import type { OrderStatus } from '@domain';

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Pendente',
  in_progress: 'Em andamento',
  completed: 'Concluído',
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  in_progress: 'bg-violet-100 text-violet-700',
  completed: 'bg-green-100 text-green-700',
};

export type DetailsHeaderProps = {
  title: string;
  status: OrderStatus;
};

export function DetailsHeader({ title, status }: DetailsHeaderProps) {
  const statusStyle = STATUS_COLOR[status] ?? 'bg-neutral-100 text-neutral-600';
  const [statusBg, statusText] = statusStyle.split(' ');

  return (
    <View className="flex-row items-start justify-between gap-2">
      <Text variant="subheading" className="flex-1">
        {title}
      </Text>
      <View className={`px-3 py-1 rounded-full ${statusBg}`}>
        <Text variant="label" className={statusText}>
          {STATUS_LABEL[status] ?? status}
        </Text>
      </View>
    </View>
  );
}
