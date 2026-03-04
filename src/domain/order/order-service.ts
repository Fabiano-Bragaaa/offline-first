import { orderLocal } from './order-local';

function getAll() {
  const results = orderLocal.getAll();

  return Array.from(results);
}

function create({
  title,
  description,
}: {
  title: string;
  description: string;
}): void {
  return orderLocal.create({ title, description });
}

function remove(id: string): void {
  return orderLocal.remove(id);
}

export const orderService = {
  getAll,
  create,
  remove,
};
