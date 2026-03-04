import { ObjectSchema } from 'realm';

export type ServiceOrder = {
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

export const ServiceOrderSchema: ObjectSchema = {
  name: 'ServiceOrder',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    description: 'string',
    status: 'string',
    assignedTo: 'string',
    createdAt: 'date',
    updatedAt: 'date',
    deletedAt: 'date?',
    completed: 'bool',
    deleted: 'bool',
  },
};
