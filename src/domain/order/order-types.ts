export type Order = {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  assignedTo: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  completed: boolean;
  deleted: boolean;
};
