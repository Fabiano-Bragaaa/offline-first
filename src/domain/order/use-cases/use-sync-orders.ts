import { queryKeys, useAppMutation } from '@infra';
import { useQueryClient } from '@tanstack/react-query';
import { orderSync } from '../order-sync';
import { getOrderSyncState } from '@services';

export function useSyncOrders() {
  const queryClient = useQueryClient();
  const { isSyncing } = getOrderSyncState();

  const { mutate: sync, isLoading } = useAppMutation({
    mutationFn: orderSync.sync,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders });
    },
  });

  return {
    sync,
    isSyncing: isSyncing || isLoading,
  };
}
