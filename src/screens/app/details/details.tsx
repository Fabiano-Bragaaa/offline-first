import { Page } from '@components';
import { Text } from 'react-native';
import type { AppScreenProps } from '@routes';

export function Details({ route }: AppScreenProps<'Details'>) {
  const { id } = route.params;

  return (
    <Page>
      <Text className="text-base text-neutral-900">ID: {id}</Text>
    </Page>
  );
}