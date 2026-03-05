import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '@screens';

export type AppStackParamList = {
  Home: undefined;
};

export const { Navigator, Screen } =
  createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
