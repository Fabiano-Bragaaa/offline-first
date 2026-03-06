import { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useGetOrder, useDeleteOrder, useUpdateOrder } from '@domain';
import { Button, Page, Text } from '@components';
import type { AppScreenProps } from '@routes';

import { DeleteConfirmModal } from './components/delete-confirm-modal/delete-confirm-modal';
import { DetailItem } from './components/detail-item/detail-item';
import { DetailsHeader } from './components/details-header/details-header';
import { EditOrderModal } from './components/edit-order-modal/edit-order-modal';

export function Details({ route, navigation }: AppScreenProps<'Details'>) {
  const { id } = route.params;
  const { data: order, isLoading } = useGetOrder(id);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { mutate: deleteOrder, isLoading: isDeleting } = useDeleteOrder({
    onSuccess: () => {
      setDeleteModalVisible(false);
      navigation.goBack();
    },
  });
  const { mutate: updateOrder, isLoading: isUpdating } = useUpdateOrder();

  function handleConfirmDelete() {
    deleteOrder(id);
  }

  if (isLoading) {
    return (
      <Page className="items-center justify-center">
        <ActivityIndicator size="large" color="#7C3AED" />
      </Page>
    );
  }

  if (!order) {
    return (
      <Page className="items-center justify-center">
        <Text variant="body" className="text-neutral-400">
          Ordem não encontrada.
        </Text>
      </Page>
    );
  }

  return (
    <Page>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="mt-2 mb-6 self-start"
        activeOpacity={0.6}
      >
        <Text variant="body" className="text-[#7C3AED] font-semibold">
          ← Voltar
        </Text>
      </TouchableOpacity>

      <View className="bg-white rounded-2xl p-5 gap-4 border border-gray-200">
        <DetailsHeader title={order.title} status={order.status} />

        <View className="h-px bg-gray-100" />

        <DetailItem label="Descrição">{order.description}</DetailItem>
        <DetailItem label="Responsável">{order.assigned_to}</DetailItem>
        <DetailItem label="Criado em">
          {new Date(order.created_at).toLocaleDateString('pt-BR')}
        </DetailItem>
      </View>

      <View className="flex-row gap-3 mt-6">
        <Button
          title="Excluir"
          preset="destructive"
          className="flex-1"
          onPress={() => setDeleteModalVisible(true)}
        />
        <Button
          title="Editar"
          preset="primary"
          className="flex-1"
          onPress={() => setEditModalVisible(true)}
        />
      </View>

      <DeleteConfirmModal
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
      <EditOrderModal
        visible={editModalVisible}
        order={order}
        onRequestClose={() => setEditModalVisible(false)}
        onSave={payload => updateOrder({ id, ...payload })}
        isLoading={isUpdating}
      />
    </Page>
  );
}
