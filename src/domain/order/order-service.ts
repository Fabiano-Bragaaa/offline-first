import { orderAdapter } from './order-adapter';
import { orderLocal } from './order-local';
import type { Order, OrderCreatePayload, OrderUpdatePayload } from './order-types';

async function getAll(): Promise<Order[]> {
  const response = await orderLocal.getAll();
  return response
    .slice()
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(raw => orderAdapter.toOrder(raw));
}

async function getById(id: string): Promise<Order | null> {
  const response = await orderLocal.getById(id);
  if (!response) return null;
  return orderAdapter.toOrder(response);
}

async function create(payload: OrderCreatePayload): Promise<Order> {
  const raw = await orderLocal.create({
    title: payload.title,
    description: payload.description,
    assignedTo: payload.assigned_to,
  });
  return orderAdapter.toOrder(raw);
}


async function update(id: string, payload: OrderUpdatePayload): Promise<Order> {
  const raw = await orderLocal.update(id, {
    title: payload.title,
    description: payload.description,
    status: payload.status !== undefined ? orderAdapter.toStatusRaw(payload.status) : undefined,
    assignedTo: payload.assigned_to,
  });
  if (!raw) {
    throw new Error('Ordem não encontrada');
  }
  return orderAdapter.toOrder(raw);
}

async function remove(id: string): Promise<void> {
  await orderLocal.remove(id);
}

export const orderService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
