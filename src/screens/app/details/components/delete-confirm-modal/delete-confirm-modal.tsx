import { View } from 'react-native';
import { Button, CenterModal, Text } from '@components';

export type DeleteConfirmModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export function DeleteConfirmModal({
  visible,
  onRequestClose,
  onConfirm,
  isLoading = false,
}: DeleteConfirmModalProps) {
  return (
    <CenterModal visible={visible} onRequestClose={onRequestClose}>
      <Text variant="subheading">Excluir ordem?</Text>
      <Text variant="body" className="text-neutral-500">
        Essa ação não poderá ser desfeita. Deseja continuar?
      </Text>
      <View className="flex-row gap-2.5 mt-1">
        <Button
          title="Cancelar"
          preset="outline"
          className="flex-1"
          onPress={onRequestClose}
          disabled={isLoading}
        />
        <Button
          title="Excluir"
          preset="destructive"
          className="flex-1"
          onPress={onConfirm}
          loading={isLoading}
          disabled={isLoading}
        />
      </View>
    </CenterModal>
  );
}
