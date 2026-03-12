import Realm from 'realm';
import { ServiceOrderSchema } from './schemas/service-order-schema';
import { OrderRaw } from '@domain';

let realmInstance: Realm | null = null;

export function getRealm() {
  if (!realmInstance) {
    realmInstance = new Realm({
      schema: [ServiceOrderSchema],
      schemaVersion: 2,
      onMigration: (oldRealm, newRealm) => {
        if (oldRealm.schemaVersion < 2) {
          const orders = newRealm.objects<OrderRaw>('ServiceOrder');
          orders.forEach((order) => {
            order.pendingAction = null;
            order.syncError = null;
          });
        }
      },
    });
  }

  return realmInstance;
}
