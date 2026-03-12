import React, { useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Order } from '@domain';
import { FloatingActionButton, Page, Text } from '@components';
import { AppScreenProps } from '@routes';
import { colors, spacing } from '@theme';

import { HomeModal } from './components/home-modal/home-modal';
import { OrderCard } from './components/order-card/order-card';
import { useHome } from './hooks/use-home';

export function Home({ navigation }: AppScreenProps<'Home'>) {
 const { orders, isSyncing } = useHome();
 const [modalVisible, setModalVisible] = useState(false);

  function renderItem({ item }: ListRenderItemInfo<Order>) {
    return (
      <OrderCard
        item={item}
        onPress={() => navigation.navigate('Details', { id: item.id })}
      />
    );
  }

  function renderEmptyComponent() {
    return (
      <Text variant="caption" className="text-center text-gray-400 mt-10">
        Nenhuma ordem cadastrada.
      </Text>
    );
  }

  function renderHeader() {
    return (
      <Text variant="heading" className="text-center my-4">
        Ordens de Serviço
      </Text>
    );
  }

  if (isSyncing) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <Page>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
        ListEmptyComponent={renderEmptyComponent}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
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
