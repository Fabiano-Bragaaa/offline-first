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
    createdAt: 'date',
    updatedAt: 'date',
    deletedAt: 'date?',
    completed: 'bool',
    deleted: 'bool',
  },
};
