import { getRealm } from '@infra';
import type { OrderRaw, OrderStatusRaw } from './order-types';

async function getAll(): Promise<OrderRaw[]> {
  const realm = getRealm();

  const results = realm
    .objects<OrderRaw>('ServiceOrder')
    .filtered('deleted == false');

  return Array.from(results);
}

async function create({
  title,
  description,
  status,
  assignedTo,
}: {
  title: string;
  description: string;
  status: OrderStatusRaw;
  assignedTo: string;
}): Promise<OrderRaw> {
  const realm = getRealm();

  const created = realm.write(() => {
    return realm.create<OrderRaw>('ServiceOrder', {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      status,
      assignedTo: assignedTo.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      completed: false,
      deleted: false,
    });
  });

  return created;
}

async function remove(id: string): Promise<void> {
  const realm = getRealm();

  realm.write(() => {
    const order = realm.objectForPrimaryKey<OrderRaw>('ServiceOrder', id);
    if (!order) return;

    order.deleted = true;
    order.deletedAt = new Date();
    order.updatedAt = new Date();
  });
}

async function getById(id: string): Promise<OrderRaw | null> {
  const realm = getRealm();
  const order = realm.objectForPrimaryKey<OrderRaw>('ServiceOrder', id);
  if (!order || order.deleted) return null;
  return order;
}

type UpdatePayload = {
  title?: string;
  description?: string;
  status?: OrderStatusRaw;
  assignedTo?: string;
};

async function update(id: string, payload: UpdatePayload): Promise<OrderRaw | null> {
  const realm = getRealm();
  const order = realm.objectForPrimaryKey<OrderRaw>('ServiceOrder', id);
  if (!order || order.deleted) return null;

  realm.write(() => {
    if (payload.title !== undefined) order.title = payload.title.trim();
    if (payload.description !== undefined) order.description = payload.description.trim();
    if (payload.status !== undefined) order.status = payload.status;
    if (payload.assignedTo !== undefined) order.assignedTo = payload.assignedTo.trim();
    order.updatedAt = new Date();
  });

  return order;
}

export const orderLocal = {
  getAll,
  getById,
  create,
  update,
  remove,
};
