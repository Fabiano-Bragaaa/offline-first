import { ObjectSchema } from 'realm';

export const ServiceOrderSchema: ObjectSchema = {
  name: 'ServiceOrder',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    description: 'string',
    status: 'string',
    assignedTo: 'string',
    createdAt: 'string',
    updatedAt: 'string',
    deletedAt: 'string?',
    completed: 'bool',
    deleted: 'bool',
    pendingAction: 'string?',
    syncError: 'string?',
  },
};
