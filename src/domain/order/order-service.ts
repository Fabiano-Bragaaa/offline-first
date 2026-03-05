import { orderAdapter } from './order-adapter';
import { orderLocal } from './order-local';
import type { Order } from './order-types';

async function getAll(): Promise<Order[]> {
  const results = await orderLocal.getAll();
  return results.map(r => orderAdapter.toOrder(r));
}

async function create({
  title,
  description,
}: {
  title: string;
  description: string;
}): Promise<Order> {
  const created = await orderLocal.create({ title, description });
  return orderAdapter.toOrder(created);
}

async function getById(id: string): Promise<Order | null> {
  const raw = await orderLocal.getById(id);
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
  remove,
};
