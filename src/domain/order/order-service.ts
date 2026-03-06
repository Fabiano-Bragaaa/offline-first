import { orderAdapter } from './order-adapter';
import { orderApi } from './order-api';
import { orderLocal } from './order-local';
import type { Order, OrderCreatePayload, OrderUpdatePayload } from './order-types';

async function getAll(): Promise<Order[]> {
  const response = await orderApi.getAll();
  return response.map(raw => orderAdapter.toOrder(raw));
}

async function create(payload: OrderCreatePayload): Promise<Order> {
  const apiPayload = {
    title: payload.title,
    description: payload.description,
    assignedTo: payload.assigned_to,
  };
  const response = await orderApi.create(apiPayload);
  return orderAdapter.toOrder(response);
}

async function getById(id: string): Promise<Order | null> {
  const raw = await orderLocal.getById(id);
  if (!raw) return null;
  return orderAdapter.toOrder(raw);
}

async function update(id: string, payload: OrderUpdatePayload): Promise<Order | null> {
  const rawPayload = {
    title: payload.title,
    description: payload.description,
    status: payload.status !== undefined ? orderAdapter.toStatusRaw(payload.status) : undefined,
    assignedTo: payload.assigned_to,
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
