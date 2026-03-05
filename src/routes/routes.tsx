import { NavigationContainer } from '@react-navigation/native';
import { AppStack } from './app-stack';

export function Routes() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
