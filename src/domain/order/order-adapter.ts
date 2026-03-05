import type { Order, OrderRaw, OrderStatus, OrderStatusRaw } from './order-types';

const STATUS_RAW_TO_DOMAIN: Record<OrderStatusRaw, OrderStatus> = {
  Pending: 'pending',
  'In Progress': 'in_progress',
  Completed: 'completed',
};

function toOrder(raw: OrderRaw): Order {
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description,
    status: STATUS_RAW_TO_DOMAIN[raw.status],
    assigned_to: raw.assignedTo,
    created_at: raw.createdAt,
    updated_at: raw.updatedAt,
    deleted_at: raw.deletedAt,
    completed: raw.completed,
    deleted: raw.deleted,
  };
}

export const orderAdapter = {
  toOrder,
};
