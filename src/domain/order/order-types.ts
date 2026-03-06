export type OrderStatus = 'pending' | 'in_progress' | 'completed';

export type OrderStatusRaw = 'Pending' | 'In Progress' | 'Completed';

export type OrderCreatePayload = {
  title: string;
  description: string;
  status: OrderStatus;
};

export type OrderUpdatePayload = {
  title?: string;
  description?: string;
  status?: OrderStatus;
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

export type OrderRaw = {
  id: string;
  title: string;
  description: string;
  status: OrderStatusRaw;
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  completed: boolean;
  deleted: boolean;
};
