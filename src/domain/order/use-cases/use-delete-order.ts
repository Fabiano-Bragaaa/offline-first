import { queryKeys, useAppMutation } from '@infra';
import { orderService } from '../order-service';
import { useQueryClient } from '@tanstack/react-query';

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useAppMutation({
    mutationFn: orderService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
    },
    onError: error => {
      console.error(error);
    },
  });

  return {
    mutate,
    isLoading,
    error,
  };
}
