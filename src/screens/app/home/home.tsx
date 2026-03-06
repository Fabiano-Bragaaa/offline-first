import React, { useState } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { Order, useOrderList } from '@domain';
import { FloatingActionButton, Page, Text } from '@components';
import { AppScreenProps } from '@routes';
import { spacing } from '@theme';

import { HomeModal } from './components/home-modal/home-modal';
import { OrderCard } from './components/order-card/order-card';

export function Home({ navigation }: AppScreenProps<'Home'>) {
  const { data: orders = [] } = useOrderList();
  const [modalVisible, setModalVisible] = useState(false);


  function renderItem({ item }: ListRenderItemInfo<Order>) {
    return (
      <OrderCard
        item={item}
        onPress={() => navigation.navigate('Details', { id: item.id })}
      />
    );
  }

  return (
    <Page >
      <Text variant="heading" className="text-center my-4">
        Ordens de Serviço
      </Text>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <Text variant="caption" className="text-center text-gray-400 mt-10">
            Nenhuma ordem cadastrada.
          </Text>
        }
        renderItem={renderItem}
      />

      <HomeModal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      />

      <FloatingActionButton
        actions={[
          {
            iconName: 'clipboard-list',
            onPress: () => setModalVisible(true),
          },
        ]}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.s10,
    paddingBottom: spacing.s100,
  },
});