import { queryKeys, useAppQuery } from '@infra';
import { orderService } from '../order-service';

export function useOrderList() {
  const { data, isLoading, error } = useAppQuery({
    queryKey: queryKeys.orders,
    queryFn: orderService.getAll,
  });

  return {
    data,
    isLoading,
    error,
  };
}
