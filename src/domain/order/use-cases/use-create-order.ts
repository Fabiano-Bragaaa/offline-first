import { queryKeys, useAppMutation } from '@infra';
import { orderService } from '../order-service';
import { useQueryClient } from '@tanstack/react-query';

export function useCreateOrder() {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useAppMutation({
    mutationFn: orderService.create,
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
