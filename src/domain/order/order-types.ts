export type OrderStatus = 'pending' | 'in_progress' | 'completed';

export type OrderStatusRaw = 'Pending' | 'In Progress' | 'Completed';

export type OrderCreatePayload = {
  title: string;
  description: string;
  assigned_to: string;
};

export type OrderUpdatePayload = {
  title?: string;
  description?: string;
  status?: OrderStatus;
  assigned_to?: string;
};

export type OrderCreatePayloadApi = {
  title: string;
  description: string;
  assignedTo: string;
};

export type OrderUpdatePayloadApi = {
  title?: string;
  description?: string;
  status?: OrderStatusRaw;
  assignedTo?: string;
};

export type Order = {
  id: string;
  title: string;
  description: string;
  status: OrderStatus;
  assigned_to: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
  completed: boolean;
  deleted: boolean;
};

export type PendingAction = 'create' | 'update' | 'delete';

export type OrderRaw = {
  id: string;
  title: string;
  description: string;
  status: OrderStatusRaw;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  completed: boolean;
  deleted: boolean;
  pendingAction?: PendingAction | null;
  syncError?: string | null;
};

export type OrderSyncItem = Omit<OrderRaw, 'pendingAction' | 'syncError'> & {
  id: string | number;
};

export type OrderSyncResponse = {
  created: OrderSyncItem[];
  updated: OrderSyncItem[];
  deleted: (string | number)[];
};
