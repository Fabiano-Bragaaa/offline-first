import { useState } from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { useGetOrder, useDeleteOrder, type OrderStatus } from '@domain';
import { Button, Page, Text } from '@components';
import type { AppScreenProps } from '@routes';

import { DeleteConfirmModal } from './components/delete-confirm-modal/delete-confirm-modal';

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Pendente',
  in_progress: 'Em andamento',
  completed: 'Concluído',
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  in_progress: 'bg-violet-100 text-violet-700',
  completed: 'bg-green-100 text-green-700',
};

export function Details({ route, navigation }: AppScreenProps<'Details'>) {
  const { id } = route.params;
  const { data: order, isLoading } = useGetOrder(id);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { mutate: deleteOrder, isLoading: isDeleting } = useDeleteOrder({
    onSuccess: () => {
      setDeleteModalVisible(false);
      navigation.goBack();
    },
  });

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

  const statusStyle = STATUS_COLOR[order.status] ?? 'bg-neutral-100 text-neutral-600';
  const [statusBg, statusText] = statusStyle.split(' ');

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
        <View className="flex-row items-start justify-between gap-2">
          <Text variant="subheading" className="flex-1">
            {order.title}
          </Text>
          <View className={`px-3 py-1 rounded-full ${statusBg}`}>
            <Text variant="label" className={statusText}>
              {STATUS_LABEL[order.status] ?? order.status}
            </Text>
          </View>
        </View>

        <View className="h-px bg-gray-100" />

        <View className="gap-1">
          <Text variant="label" className="text-neutral-400 uppercase tracking-wide">
            Descrição
          </Text>
          <Text variant="body" className="text-neutral-700">
            {order.description}
          </Text>
        </View>

        <View className="gap-1">
          <Text variant="label" className="text-neutral-400 uppercase tracking-wide">
            Responsável
          </Text>
          <Text variant="body" className="text-neutral-700">
            {order.assigned_to}
          </Text>
        </View>

        <View className="gap-1">
          <Text variant="label" className="text-neutral-400 uppercase tracking-wide">
            Criado em
          </Text>
          <Text variant="body" className="text-neutral-700">
            {new Date(order.created_at).toLocaleDateString('pt-BR')}
          </Text>
        </View>
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
          onPress={() => {}}
        />
      </View>

      <DeleteConfirmModal
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
      />
    </Page>
  );
}
