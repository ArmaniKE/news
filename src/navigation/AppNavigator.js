import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Новости" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: "Подробнее" }}
      />
    </Stack.Navigator>
  );
}
