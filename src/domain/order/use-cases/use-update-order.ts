import { queryKeys, useAppMutation, useAppMutationOptions } from '@infra';
import { orderService } from '../order-service';
import { useQueryClient } from '@tanstack/react-query';
import type { Order, OrderUpdatePayload } from '../order-types';

type UpdateOrderPayload = OrderUpdatePayload & { id: string };

export function useUpdateOrder(options?: useAppMutationOptions<Order>) {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useAppMutation({
    mutationFn: ({ id, ...payload }: UpdateOrderPayload) =>
      orderService.update(id, payload),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
      queryClient.invalidateQueries({ queryKey: queryKeys.order(variables.id) });
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
