import { api } from '@infra';
import type { OrderRaw } from './order-types';

async function getAll(): Promise<OrderRaw[]> {
  const response = await api.get<OrderRaw[]>('/work-orders');
  return response.data;
}

export const orderApi = {
  getAll,

};
