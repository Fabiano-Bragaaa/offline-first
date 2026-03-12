import { create } from 'zustand';
import type { SyncStateType } from './order-type';

const useOrderStore = create<SyncStateType>(set => ({
  isSyncing: false,
  lastSyncAt: null,
  isOnline: false,
  lastSyncError: null,
  setIsSyncing: value => set({ isSyncing: value }),
  setLastSyncAt: date => set({ lastSyncAt: date }),
  setIsOnline: value => set({ isOnline: value }),
  setLastSyncError: error => set({ lastSyncError: error }),
}));

export function getOrderSyncState(): Pick<
  SyncStateType,
  'isSyncing' | 'lastSyncAt' | 'isOnline' | 'lastSyncError'
> {
  const state = useOrderStore.getState();
  return {
    isSyncing: state.isSyncing,
    lastSyncAt: state.lastSyncAt,
    isOnline: state.isOnline,
    lastSyncError: state.lastSyncError,
  };
}

export function getOrderSyncActions(): Pick<
  SyncStateType,
  'setIsOnline' | 'setLastSyncAt' | 'setLastSyncError' | 'setIsSyncing'
> {
  const state = useOrderStore.getState();
  return {
    setIsOnline: state.setIsOnline,
    setLastSyncAt: state.setLastSyncAt,
    setLastSyncError: state.setLastSyncError,
    setIsSyncing: state.setIsSyncing,
  };
}

