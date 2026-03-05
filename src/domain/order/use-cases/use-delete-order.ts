import { queryKeys, useAppMutation, useAppMutationOptions } from '@infra';
import { orderService } from '../order-service';
import { useQueryClient } from '@tanstack/react-query';

export function useDeleteOrder(options?: useAppMutationOptions<void>) {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useAppMutation({
    mutationFn: orderService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
      options?.onSuccess?.();
    },
    onError: error => {
      console.error(error);
      options?.onError?.(error);
    },
  });

  return {
    mutate,
    isLoading,
    error,
  };
}
