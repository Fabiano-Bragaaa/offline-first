import { orderAdapter } from './order-adapter';
import { orderApi } from './order-api';
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
  const response = await orderApi.getById(id);
  if (!response) return null;
  return orderAdapter.toOrder(response);
}

async function update(id: string, payload: OrderUpdatePayload): Promise<Order> {
  const apiPayload = {
    title: payload.title,
    description: payload.description,
    status: payload.status !== undefined ? orderAdapter.toStatusRaw(payload.status) : undefined,
    assignedTo: payload.assigned_to,
  };
  const response = await orderApi.update(id, apiPayload);
  if (!response) {
    throw new Error('Ordem não encontrada');
  }
  return orderAdapter.toOrder(response);
}

async function remove(id: string): Promise<void> {
  await orderApi.remove(id);
}

export const orderService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
