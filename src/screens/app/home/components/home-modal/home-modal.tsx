import { useState } from 'react';
import { Alert, View } from 'react-native';
import { useCreateOrder } from '@domain';
import { Button, CenterModal, Text, TextInput } from '@components';

export type HomeModalProps = {
  visible: boolean;
  onRequestClose: () => void;
};

export function HomeModal({ visible, onRequestClose }: HomeModalProps) {
  const { mutate: createOrder, isLoading } = useCreateOrder( {
    onSuccess: () => {
      resetForm();
      onRequestClose();
    },
  },);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  function resetForm() {
    setTitle('');
    setDescription('');
    setAssignedTo('');
  }

  function handleClose() {
    resetForm();
    onRequestClose();
  }

  function handleAdd() {
    if (!title.trim() || !description.trim() || !assignedTo.trim()) {
      Alert.alert('Preencha título, descrição e nome do técnico');
      return;
    }
    createOrder(
      {
        title: title.trim(),
        description: description.trim(),
        assigned_to: assignedTo.trim(),
      },
    );
  }

  return (
    <CenterModal visible={visible} onRequestClose={handleClose}>
      <Text variant="subheading" className="mb-1">
        Nova Ordem
      </Text>
      <TextInput
        placeholder="Ex: Troca de óleo"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Ex: Veículo Honda Civic"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Nome do técnico"
        value={assignedTo}
        onChangeText={setAssignedTo}
      />
      <View className="flex-row gap-2.5 mt-1">
        <Button
          title="Cancelar"
          preset="outline"
          className="flex-1"
          onPress={handleClose}
          disabled={isLoading}
        />
        <Button
          title="Adicionar"
          preset="primary"
          className="flex-1"
          onPress={handleAdd}
          loading={isLoading}
          disabled={isLoading}
        />
      </View>
    </CenterModal>
  );
}
