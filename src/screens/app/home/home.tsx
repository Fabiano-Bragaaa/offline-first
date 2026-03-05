import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useOrderList, useCreateOrder } from '@domain';
import { FloatingActionButton, Page, Text } from '@components';
import { AppScreenProps } from '@routes';

export function Home({ navigation }: AppScreenProps<'Home'>) {
  const { data: orders = [] } = useOrderList();
  const { mutate: createOrder } = useCreateOrder();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function handleAdd() {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Preencha título e descrição');
      return;
    }
    createOrder({ title: title.trim(), description: description.trim() });
    setTitle('');
    setDescription('');
    setModalVisible(false);
  }
  return (
    <Page >
      <Text variant="heading" className="text-center my-4">
        Ordens de Serviço
      </Text>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 100,
        }}
        ListEmptyComponent={
          <Text variant="caption" className="text-center text-gray-400 mt-10">
            Nenhuma ordem cadastrada.
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white rounded-xl p-3.5 flex-row items-center border border-gray-200"
            onPress={() => navigation.navigate('Details', { id: item.id })}
            activeOpacity={0.7}
          >
            <View className="flex-1">
              <Text variant="body" className="font-semibold text-neutral-900">
                {item.title}
              </Text>
              <Text variant="caption" className="text-neutral-600 mt-0.5">
                {item.description}
              </Text>
              <Text variant="label" className="text-[#4F6EF7] mt-1">
                {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center">
          <View className="bg-white rounded-2xl p-6 w-[85%] gap-3">
            <Text variant="subheading" className="mb-1">
              Nova Ordem
            </Text>
            <TextInput
              className="bg-neutral-50 rounded-lg px-3 py-2.5 text-base border border-gray-300"
              placeholder="Título"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              className="bg-neutral-50 rounded-lg px-3 py-2.5 text-base border border-gray-300"
              placeholder="Descrição"
              value={description}
              onChangeText={setDescription}
            />
            <View className="flex-row gap-2.5 mt-1">
              <TouchableOpacity
                className="flex-1 rounded-lg py-3 items-center bg-gray-200"
                onPress={() => setModalVisible(false)}
              >
                <Text variant="body" className="text-neutral-600 font-semibold">
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 rounded-lg py-3 items-center bg-[#4F6EF7]"
                onPress={handleAdd}
              >
                <Text variant="body" className="text-white font-semibold">
                  Adicionar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <FloatingActionButton
        actions={[
          {
            label: '📋',
            onPress: () => setModalVisible(true),
          },
        ]}
      />
    </Page>
  );
}
