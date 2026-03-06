import { queryKeys, useAppMutation } from '@infra';
import { orderService } from '../order-service';
import { useQueryClient } from '@tanstack/react-query';
import type { OrderStatus } from '../order-types';

type UpdateOrderPayload = {
  id: string;
  title?: string;
  description?: string;
  status?: OrderStatus;
};

export function useUpdateOrder() {
  const queryClient = useQueryClient();

  const { mutate, isLoading, error } = useAppMutation({
    mutationFn: ({ id, ...payload }: UpdateOrderPayload) =>
      orderService.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
      queryClient.invalidateQueries({ queryKey: queryKeys.order(variables.id) });
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
