import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Button, Divider, Icon, Page, Text } from '@components';
import type { AppScreenProps } from '@routes';
import { colors, spacing } from '@theme';

import { DeleteConfirmModal } from './components/delete-confirm-modal/delete-confirm-modal';
import { DetailItem } from './components/detail-item/detail-item';
import { DetailsHeader } from './components/details-header/details-header';
import { EditOrderModal } from './components/edit-order-modal/edit-order-modal';
import { useDetails } from './hooks/use-details';

export function Details({ route, navigation }: AppScreenProps<'Details'>) {
  const { id } = route.params;
  const detailsState = useDetails(id);
  if (detailsState.isLoading) {
    return (
      <Page className="items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </Page>
    );
  }

  if (!detailsState.order) {
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
        onPress={navigation.goBack}
        className="mt-2 mb-6 self-start"
        activeOpacity={0.6}
      >
        <Icon name="arrow-left" size={spacing.s20} color={colors.primary} />
      </TouchableOpacity>

      <View className="bg-white rounded-2xl p-5 gap-4 border border-gray-200">
        <DetailsHeader title={detailsState.order.title} status={detailsState.order.status} />

        <Divider />

        <DetailItem label="Descrição">{detailsState.order.description}</DetailItem>
        <DetailItem label="Responsável">{detailsState.order.assigned_to}</DetailItem>
        <DetailItem label="Criado em">
          {new Date(detailsState.order.created_at).toLocaleDateString('pt-BR')}
        </DetailItem>
      </View>

      <View className="flex-row gap-3 mt-6">
        <Button
          title="Excluir"
          preset="destructive"
          className="flex-1"
          onPress={() => detailsState.setDeleteModalVisible(true)}
        />
        <Button
          title="Editar"
          preset="primary"
          className="flex-1"
          onPress={() => detailsState.setEditModalVisible(true)}
        />
      </View>

      <DeleteConfirmModal
        visible={detailsState.deleteModalVisible}
        onRequestClose={() => detailsState.setDeleteModalVisible(false)}
        onConfirm={detailsState.handleConfirmDelete}
        isLoading={detailsState.isDeleting}
      />
      <EditOrderModal
        visible={detailsState.editModalVisible}
        order={detailsState.order}
        onRequestClose={() => detailsState.setEditModalVisible(false)}
        onSave={payload => detailsState.updateOrder({ id, ...payload })}
        isLoading={detailsState.isUpdating}
      />
    </Page>
  );
}
