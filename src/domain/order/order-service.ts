import { orderAdapter } from './order-adapter';
import { orderLocal } from './order-local';
import type { Order, OrderCreatePayload, OrderUpdatePayload } from './order-types';

async function getAll(): Promise<Order[]> {
  const results = await orderLocal.getAll();
  return results.map(r => orderAdapter.toOrder(r));
}

async function create(payload: OrderCreatePayload): Promise<Order> {
  const rawPayload = {
    title: payload.title,
    description: payload.description,
    status: orderAdapter.toStatusRaw(payload.status),
  };
  const created = await orderLocal.create(rawPayload);
  return orderAdapter.toOrder(created);
}

async function getById(id: string): Promise<Order | null> {
  const raw = await orderLocal.getById(id);
  if (!raw) return null;
  return orderAdapter.toOrder(raw);
}

async function update(id: string, payload: OrderUpdatePayload): Promise<Order | null> {
  const rawPayload = {
    ...payload,
    status: payload.status !== undefined ? orderAdapter.toStatusRaw(payload.status) : undefined,
  };
  const raw = await orderLocal.update(id, rawPayload);
  if (!raw) return null;
  return orderAdapter.toOrder(raw);
}

async function remove(id: string): Promise<void> {
  return orderLocal.remove(id);
}

export const orderService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
