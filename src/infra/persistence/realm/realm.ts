import Realm from 'realm';
import { ServiceOrderSchema } from './schemas/service-order-schema';

let realmInstance: Realm | null = null;

export function getRealm() {
  if (!realmInstance) {
    realmInstance = new Realm({
      schema: [ServiceOrderSchema],
      schemaVersion: 1,
    });
  }

  return realmInstance;
}
