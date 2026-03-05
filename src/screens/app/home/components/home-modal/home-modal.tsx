import { useState } from 'react';
import { Alert, View } from 'react-native';
import { useCreateOrder } from '@domain';
import { Button, CenterModal, Text, TextInput } from '@components';

export type HomeModalProps = {
  visible: boolean;
  onRequestClose: () => void;
};

export function HomeModal({ visible, onRequestClose }: HomeModalProps) {
  const { mutate: createOrder } = useCreateOrder();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleAdd() {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Preencha título e descrição');
      return;
    }
    createOrder({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
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
