import { getRealm } from '@infra';
import { Order } from './order-types';

async function getAll(): Promise<Order[]> {
  const realm = getRealm();

  const results = realm
    .objects<Order>('ServiceOrder')
    .filtered('deleted == false');

  return Array.from(results);
}

async function create({
  title,
  description,
}: {
  title: string;
  description: string;
}): Promise<Order> {
  const realm = getRealm();

  const created = realm.write(() => {
    return realm.create<Order>('ServiceOrder', {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      status: 'Pending',
      assignedTo: 'Me',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      completed: false,
      deleted: false,
    });
  });

  return created;
}

async function remove(id: string): Promise<void> {
  const realm = getRealm();

  realm.write(() => {
    const order = realm.objectForPrimaryKey<Order>('ServiceOrder', id);
    if (!order) return;

    order.deleted = true;
    order.deletedAt = new Date();
    order.updatedAt = new Date();
  });
}

export const orderLocal = {
  getAll,
  create,
  remove,
};
