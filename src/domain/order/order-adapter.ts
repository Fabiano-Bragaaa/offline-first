import type {
  Order,
  OrderRaw,
  OrderStatus,
  OrderStatusRaw,
} from './order-types';

const STATUS_RAW_TO_DOMAIN: Record<OrderStatusRaw, OrderStatus> = {
  Pending: 'pending',
  'In Progress': 'in_progress',
  Completed: 'completed',
};

const STATUS_DOMAIN_TO_RAW: Record<OrderStatus, OrderStatusRaw> = {
  pending: 'Pending',
  in_progress: 'In Progress',
  completed: 'Completed',
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

export function toStatusRaw(status: OrderStatus): OrderStatusRaw {
  return STATUS_DOMAIN_TO_RAW[status];
}

export const orderAdapter = {
  toOrder,
  toStatusRaw,
};
