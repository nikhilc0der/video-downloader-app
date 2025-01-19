import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/HomeScreen";
import BrowserScreen from "../../screens/BrowserScreen";
import SearchScreen from "../../screens/SearchScreen";
import { Platform } from "react-native";

export default function HomeScreenNavigator({ drawerNavigation }) {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: Platform.OS === "android" ? "modal" : "card",
      }}
    >
      <Stack.Screen name="HomeScreen" options={{ headerShown: false }}>
        {(props) => (
          <HomeScreen {...props} drawerNavigation={drawerNavigation} />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="BrowserScreen"
        component={BrowserScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
