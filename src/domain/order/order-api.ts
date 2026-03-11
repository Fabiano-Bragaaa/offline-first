import { api } from '@infra';
import type { OrderCreatePayloadApi, OrderRaw, OrderSyncResponse, OrderUpdatePayloadApi } from './order-types';

async function getAll(): Promise<OrderRaw[]> {
  const response = await api.get<OrderRaw[]>('/work-orders');
  return response.data;
}

async function create(payload: OrderCreatePayloadApi): Promise<OrderRaw> {
  const response = await api.post<OrderRaw>('/work-orders', payload);
  return response.data;
}

async function getById(id: string): Promise<OrderRaw> {
  const response = await api.get<OrderRaw>(`/work-orders/${id}`);
  return response.data;
}

async function update(id: string, payload: OrderUpdatePayloadApi): Promise<OrderRaw> {
  const response = await api.put<OrderRaw>(`/work-orders/${id}`, payload);
  return response.data;
}

async function remove(id: string): Promise<void> {
  await api.delete<void>(`/work-orders/${id}`);
}

async function getSync(since: string): Promise<OrderSyncResponse> {
  const response = await api.get<OrderSyncResponse>('/work-orders/sync', {
    params: { since },
  });
  return response.data;
}

export const orderApi = {
  getAll,
  create,
  getById,
  update,
  remove,
  getSync,
};
