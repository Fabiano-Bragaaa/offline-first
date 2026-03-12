import { orderApi } from './order-api';
import { orderLocal } from './order-local';
import type { OrderRaw } from './order-types';
import { getOrderSyncState, getOrderSyncActions } from '@services';

const EPOCH = '1970-01-01T00:00:00.000Z';

function isNotFoundError(err: unknown): boolean {
  return (
    typeof err === 'object' &&
    err !== null &&
    'response' in err &&
    (err as { response?: { status?: number } }).response?.status === 404
  );
}

function formatSyncError(err: unknown): string {
  return err instanceof Error ? err.message : 'Erro desconhecido';
}

async function handleCreatePending(item: OrderRaw): Promise<void> {
  const serverRaw = await orderApi.create({
    title: item.title,
    description: item.description,
    assignedTo: item.assignedTo,
  });
  await orderLocal.reconcileCreate(item.id, serverRaw);
}

async function handleUpdatePending(item: OrderRaw): Promise<void> {
  const serverRaw = await orderApi.update(item.id, {
    title: item.title,
    description: item.description,
    status: item.status,
    assignedTo: item.assignedTo,
  });
  await orderLocal.upsertFromServer(serverRaw);
}

async function handleDeletePending(item: OrderRaw): Promise<void> {
  try {
    await orderApi.remove(item.id);
    await orderLocal.clearPending(item.id);
  } catch (err) {
    if (isNotFoundError(err)) {
      await orderLocal.clearPending(item.id);
    } else {
      throw err;
    }
  }
}

async function syncUp(): Promise<number> {
  const pending = await orderLocal.getPending();
  let failedCount = 0;

  for (const item of pending) {
    try {
      if (item.pendingAction === 'create') {
        await handleCreatePending(item);
      } else if (item.pendingAction === 'update') {
        await handleUpdatePending(item);
      } else if (item.pendingAction === 'delete') {
        await handleDeletePending(item);
      }
    } catch (err) {
      const message = formatSyncError(err);
      await orderLocal.setSyncError(item.id, message);
      failedCount++;
    }
  }

  return failedCount;
}

async function syncDown(): Promise<void> {
  const { lastSyncAt } = getOrderSyncState();
  const { setLastSyncAt } = getOrderSyncActions();
  const since = lastSyncAt ?? EPOCH;

  const syncStartedAt = new Date().toISOString();

  const data = await orderApi.getSync(since);
  await orderLocal.applySync(data);

  setLastSyncAt(syncStartedAt);
}

async function sync(): Promise<void> {
  const { setIsSyncing, setLastSyncError } = getOrderSyncActions();

  setIsSyncing(true);
  setLastSyncError(null);

  try {
    const failedCount = await syncUp();
    await syncDown();

    if (failedCount > 0) {
      setLastSyncError(`${failedCount} item(s) não sincronizado(s). Serão retentados na próxima sync.`);
    }
  } catch (err) {
    const message = formatSyncError(err);
    setLastSyncError(message);
    throw err;
  } finally {
    setIsSyncing(false);
  }
}

export const orderSync = { sync };
