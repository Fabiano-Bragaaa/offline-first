import { queryKeys, useAppQuery } from '@infra';
import { orderService } from '../order-service';

export function useGetOrder(id: string) {
  const { data, isLoading, error } = useAppQuery({
    queryKey: queryKeys.order(id),
    queryFn: () => orderService.getById(id),
  });

  return {
    data,
    isLoading,
    error,
  };
}
