import { type PropsWithChildren } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  type StyleProp,
  View,
  type ViewStyle,
} from 'react-native';
import { twMerge } from 'tailwind-merge';

import { ScrollPage, ViewPage } from './components/page-container';
import { useAppSafeArea } from '@hooks';

export type PageProps = PropsWithChildren & {
  scroll?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

export function Page({
  children,
  scroll = false,
  className,
  style,
}: PageProps) {
  const { top, bottom } = useAppSafeArea();
  const Container = scroll ? ScrollPage : ViewPage;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container>
        <View
          className={twMerge('flex-1 px-4', className)}
          style={[{ paddingTop: top, paddingBottom: bottom }, style]}
        >
          {children}
        </View>
      </Container>
    </KeyboardAvoidingView>
  );
}
