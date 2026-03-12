export type SyncStateType = {
  isSyncing: boolean;
  lastSyncAt: string | null;
  isOnline: boolean;
  lastSyncError: string | null;
  setIsSyncing: (value: boolean) => void;
  setLastSyncAt: (date: string) => void;
  setIsOnline: (value: boolean) => void;
  setLastSyncError: (error: string | null) => void;
};
