import { useAppSafeArea } from '@hooks';
import { type PropsWithChildren } from 'react';
import { ScrollView, View } from 'react-native';

export function ViewPage({ children }: PropsWithChildren) {
  return <View className="flex-1 bg-neutral-100">{children}</View>;
}

export function ScrollPage({ children }: PropsWithChildren) {
  const { bottom } = useAppSafeArea();
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1 }}
      className="bg-neutral-100"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: bottom + 24 }}
    >
      {children}
    </ScrollView>
  );
}
