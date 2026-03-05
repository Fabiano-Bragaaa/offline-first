import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useOrderList, useCreateOrder, useDeleteOrder } from '@domain';
import { FloatingActionButton } from '@components';

export function Home() {
  const { data: orders = [], isLoading, error } = useOrderList();
  const { mutate: createOrder } = useCreateOrder();
  const { mutate: deleteOrder } = useDeleteOrder();
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

  function handleDelete(id: string) {
    deleteOrder(id);
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-neutral-100">
        <Text className="text-center text-gray-400 mt-10 text-base">
          Carregando...
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-blac">
        <Text className="text-center text-gray-400 mt-10 text-base">
          Erro ao carregar ordens.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-100">
      <Text className="text-[22px] font-bold text-center my-4 text-neutral-900">
        Ordens de Serviço
      </Text>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 10,
          paddingBottom: 100,
        }}
        ListEmptyComponent={
          <Text className="text-center text-gray-400 mt-10 text-base">
            Nenhuma ordem cadastrada.
          </Text>
        }
        renderItem={({ item }) => (
          <View className="bg-white rounded-xl p-3.5 flex-row items-center border border-gray-200">
            <View className="flex-1">
              <Text className="text-base font-semibold text-neutral-900">
                {item.title}
              </Text>
              <Text className="text-sm text-neutral-600 mt-0.5">
                {item.description}
              </Text>
              <Text className="text-xs text-[#4F6EF7] mt-1 font-medium">
                {item.status}
              </Text>
            </View>
            <TouchableOpacity
              className="p-2"
              onPress={() => handleDelete(item.id)}
            >
              <Text className="text-base text-red-500 font-semibold">✕</Text>
            </TouchableOpacity>
          </View>
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
            <Text className="text-lg font-bold text-neutral-900 mb-1">
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
                <Text className="text-neutral-600 font-semibold text-base">
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 rounded-lg py-3 items-center bg-[#4F6EF7]"
                onPress={handleAdd}
              >
                <Text className="text-white font-semibold text-base">
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
    </SafeAreaView>
  );
}
