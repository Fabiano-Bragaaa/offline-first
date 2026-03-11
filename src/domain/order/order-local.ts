import { getRealm } from '@infra';
import type { OrderRaw,  OrderSyncItem, OrderSyncResponse, OrderUpdatePayloadApi } from './order-types';

async function getAll(): Promise<OrderRaw[]> {
  const realm = getRealm();
  const results = realm
    .objects<OrderRaw>('ServiceOrder')
    .filtered('deleted == false');
  return Array.from(results);
}

async function getById(id: string): Promise<OrderRaw | null> {
  const realm = getRealm();
  const order = realm.objectForPrimaryKey<OrderRaw>('ServiceOrder', id);
  if (!order || order.deleted) return null;
  return order;
}

async function create({
  title,
  description,
  assignedTo,
}: {
  title: string;
  description: string;
  assignedTo: string;
}): Promise<OrderRaw> {
  const realm = getRealm();

  const created = realm.write(() => {
    const now = new Date().toISOString();
    return realm.create<OrderRaw>('ServiceOrder', {
      id: `local_${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      status: 'Pending',
      assignedTo: assignedTo.trim(),
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      completed: false,
      deleted: false,
      pendingAction: 'create',
      syncError: null,
    });
  });

  return created;
}



async function update(id: string, payload: OrderUpdatePayloadApi): Promise<OrderRaw | null> {
  const realm = getRealm();
  const order = realm.objectForPrimaryKey<OrderRaw>('ServiceOrder', id);
  if (!order || order.deleted) return null;

  realm.write(() => {
    if (payload.title !== undefined) order.title = payload.title.trim();
    if (payload.description !== undefined) order.description = payload.description.trim();
    if (payload.status !== undefined) order.status = payload.status;
    if (payload.assignedTo !== undefined) order.assignedTo = payload.assignedTo.trim();
    order.updatedAt = new Date().toISOString();
    if (order.pendingAction !== 'create') {
      order.pendingAction = 'update';
    }
    order.syncError = null;
  });

  return order;
}

async function remove(id: string): Promise<void> {
  const realm = getRealm();

  realm.write(() => {
    const order = realm.objectForPrimaryKey<OrderRaw>('ServiceOrder', id);
    if (!order) return;

    if (order.pendingAction === 'create') {
      realm.delete(order);
    } else {
      order.deleted = true;
      order.deletedAt = new Date().toISOString();
      order.updatedAt = new Date().toISOString();
      order.pendingAction = 'delete';
      order.syncError = null;
    }
  });

}

async function getPending(): Promise<OrderRaw[]> {
  const realm = getRealm();
  const results = realm
    .objects<OrderRaw>('ServiceOrder')
    .filtered('pendingAction != nil AND pendingAction != ""');
  return Array.from(results);
}

async function clearPending(id: string): Promise<void> {
  const realm = getRealm();
  realm.write(() => {
    const order = realm.objectForPrimaryKey<OrderRaw>('ServiceOrder', id);
    if (order) {
      order.pendingAction = null;
      order.syncError = null;
    }
  });
}

async function setSyncError(id: string, error: string): Promise<void> {
  const realm = getRealm();
  realm.write(() => {
    const order = realm.objectForPrimaryKey<OrderRaw>('ServiceOrder', id);
    if (order) {
      order.syncError = error;
    }
  });
}

async function reconcileCreate(localId: string, serverRaw: OrderRaw): Promise<void> {
  const realm = getRealm();
  realm.write(() => {
    const local = realm.objectForPrimaryKey<OrderRaw>('ServiceOrder', localId);
    if (local) {
      realm.delete(local);
    }
    realm.create<OrderRaw>('ServiceOrder', {
      ...serverRaw,
      pendingAction: null,
      syncError: null,
    });
  });
}

async function upsertFromServer(item: OrderSyncItem): Promise<void> {
  const realm = getRealm();
  const id = String(item.id);

  realm.write(() => {
    const existing = realm.objectForPrimaryKey<OrderRaw>('ServiceOrder', id);

    if (existing) {
      if (existing.pendingAction) {
        const localTime = new Date(existing.updatedAt).getTime();
        const serverTime = new Date(item.updatedAt).getTime();
        if (localTime >= serverTime) {
          return;
        }
      }
      existing.title = item.title;
      existing.description = item.description;
      existing.status = item.status;
      existing.assignedTo = item.assignedTo;
      existing.createdAt = item.createdAt;
      existing.updatedAt = item.updatedAt;
      existing.deletedAt = item.deletedAt ?? null;
      existing.completed = item.completed;
      existing.deleted = item.deleted;
      existing.pendingAction = null;
      existing.syncError = null;
    } else {
      realm.create<OrderRaw>('ServiceOrder', {
        id,
        title: item.title,
        description: item.description,
        status: item.status,
        assignedTo: item.assignedTo,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        deletedAt: item.deletedAt ?? null,
        completed: item.completed,
        deleted: item.deleted,
        pendingAction: null,
        syncError: null,
      });
    }
  });
}

async function applySync(data: OrderSyncResponse): Promise<void> {
  [...data.created, ...data.updated].forEach(item => upsertFromServer(item));

  const realm = getRealm();
  realm.write(() => {
    data.deleted.forEach(rawId => {
      const id = String(rawId);
      const order = realm.objectForPrimaryKey<OrderRaw>('ServiceOrder', id);
      if (order && !order.pendingAction) {
        order.deleted = true;
        order.deletedAt = new Date().toISOString();
        order.updatedAt = new Date().toISOString();
      }
    });
  });
}

export const orderLocal = {
  getAll,
  getById,
  create,
  update,
  remove,
  getPending,
  clearPending,
  setSyncError,
  reconcileCreate,
  upsertFromServer,
  applySync,
};
