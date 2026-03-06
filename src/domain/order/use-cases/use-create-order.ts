import { queryKeys, useAppMutation, useAppMutationOptions } from '@infra';
import { orderService } from '../order-service';
import { useQueryClient } from '@tanstack/react-query';
import { Order } from '../order-types';

export function useCreateOrder(options?: useAppMutationOptions<Order>) {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useAppMutation({
    mutationFn: orderService.create,
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
      options?.onSuccess?.(data);
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
