import { useState } from 'react';
import { Alert, View } from 'react-native';
import { useCreateOrder, type OrderStatus } from '@domain';
import { Button, CenterModal, OptionPicker, Text, TextInput } from '@components';

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: 'pending', label: 'Pendente' },
  { value: 'in_progress', label: 'Em andamento' },
  { value: 'completed', label: 'Concluído' },
];

export type HomeModalProps = {
  visible: boolean;
  onRequestClose: () => void;
};

export function HomeModal({ visible, onRequestClose }: HomeModalProps) {
  const { mutate: createOrder } = useCreateOrder();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState<OrderStatus>('pending');

  function handleAdd() {
    if (!title.trim() || !description.trim() || !assignedTo.trim()) {
      Alert.alert('Preencha título, descrição e nome do técnico');
      return;
    }
    createOrder({
      title: title.trim(),
      description: description.trim(),
      assigned_to: assignedTo.trim(),
      status,
    });
    setTitle('');
    setDescription('');
    setAssignedTo('');
    setStatus('pending');
    onRequestClose();
  }

  return (
    <CenterModal visible={visible} onRequestClose={onRequestClose}>
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
        />
        <Button title="Adicionar" preset="primary" className="flex-1" onPress={handleAdd} />
      </View>
    </CenterModal>
  );
}
