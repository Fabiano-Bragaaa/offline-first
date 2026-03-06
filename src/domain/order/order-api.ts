import { api } from '@infra';
import type { OrderCreatePayloadApi, OrderRaw } from './order-types';

async function getAll(): Promise<OrderRaw[]> {
  const response = await api.get<OrderRaw[]>('/work-orders');
  return response.data;
}

async function create(payload: OrderCreatePayloadApi): Promise<OrderRaw> {
  const response = await api.post<OrderRaw>('/work-orders', payload);
  return response.data;
}

export const orderApi = {
  getAll,
  create,
};
