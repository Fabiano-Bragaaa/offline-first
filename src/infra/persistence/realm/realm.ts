import Realm from 'realm';
import { ServiceOrderSchema } from './schemas/service-order-schema';

export const realm = new Realm({
  schema: [ServiceOrderSchema],
  schemaVersion: 1,
});
