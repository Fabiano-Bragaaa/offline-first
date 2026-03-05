import { orderLocal } from './order-local';
import { Order } from './order-types';

async function getAll(): Promise<Order[]> {
  const results = await orderLocal.getAll();

  return results;
}

function create({
  title,
  description,
}: {
  title: string;
  description: string;
}): Promise<Order> {
  return orderLocal.create({ title, description });
}

async function getById(id: string): Promise<Order | null> {
  return orderLocal.getById(id);
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
