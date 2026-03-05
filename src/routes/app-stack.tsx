import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Details, Home } from '@screens';

export type AppStackParamList = {
  Home: undefined;
  Details: { id: string };
};

export const { Navigator, Screen } =
  createNativeStackNavigator<AppStackParamList>();

export function AppStack() {
  return (
    <Navigator screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}>
      <Screen name="Home" component={Home} />
      <Screen name="Details" component={Details} />
    </Navigator>
  );
}
