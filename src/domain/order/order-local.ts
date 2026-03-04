import { getRealm } from '@infra';
import { Order } from './order-types';

function getAll() {
  const realm = getRealm();

  return realm.objects<Order>('ServiceOrder').filtered('deleted == false');
}

function create({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const realm = getRealm();

  realm.write(() => {
    realm.create('ServiceOrder', {
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
}

function remove(id: string) {
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
