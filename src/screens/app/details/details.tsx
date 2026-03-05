import { Page, Text } from '@components';
import type { AppScreenProps } from '@routes';

export function Details({ route }: AppScreenProps<'Details'>) {
  const { id } = route.params;

  return (
    <Page>
      <Text variant="body">ID: {id}</Text>
    </Page>
  );
}