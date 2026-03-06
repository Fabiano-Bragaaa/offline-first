import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import type { Order, OrderStatus } from '@domain';
import { Button, CenterModal, OptionPicker, Text, TextInput } from '@components';

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: 'pending', label: 'Pendente' },
  { value: 'in_progress', label: 'Em andamento' },
  { value: 'completed', label: 'Concluído' },
];

export type EditOrderModalProps = {
  visible: boolean;
  order: Order | null;
  onRequestClose: () => void;
  onSave: (payload: {
    title: string;
    description: string;
    status: OrderStatus;
    assigned_to: string;
  }) => void;
  isLoading?: boolean;
};

export function EditOrderModal({
  visible,
  order,
  onRequestClose,
  onSave,
  isLoading = false,
}: EditOrderModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState<OrderStatus>(order?.status ?? 'pending');

  useEffect(() => {
    if (visible && order) {
      setTitle(order.title);
      setDescription(order.description);
      setAssignedTo(order.assigned_to);
      setStatus(order.status);
    }
  }, [visible, order]);

  function handleSave() {
    if (!title.trim() || !description.trim() || !assignedTo.trim()) {
      Alert.alert('Preencha título, descrição e nome do técnico');
      return;
    }
    onSave({
      title: title.trim(),
      description: description.trim(),
      assigned_to: assignedTo.trim(),
      status,
    });
    onRequestClose();
  }

  if (!order) return null;

  return (
    <CenterModal visible={visible} onRequestClose={onRequestClose}>
      <Text variant="subheading" className="mb-1">
        Editar ordem
      </Text>
      <TextInput
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Nome do técnico"
        value={assignedTo}
        onChangeText={setAssignedTo}
      />
      <OptionPicker
        label="Status"
        options={STATUS_OPTIONS}
        value={status}
        onValueChange={setStatus}
      />
      <View className="flex-row gap-2.5 mt-1">
        <Button
          title="Cancelar"
          preset="outline"
          className="flex-1"
          onPress={onRequestClose}
          disabled={isLoading}
        />
        <Button
          title="Salvar"
          preset="primary"
          className="flex-1"
          onPress={handleSave}
          loading={isLoading}
        />
      </View>
    </CenterModal>
  );
}
