import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MyDrawer from "./DrawerNavigatorApp";
import FeedbackScreen from "../../screens/FeedbackScreen";
import SliderScreen from "../../screens/SliderScreen";
import SettingScreen from "../../screens/SettingScreen";
import VideoPlayScreen from "../../screens/VideoPlayScreen";
import WhatsAppScreen from "../../screens/WhatsAppScreen";
import GalleryScreen from "../../screens/GalleryScreen";
import { Platform } from "react-native";
const StackNavigatorApp = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          presentation: Platform.OS === "android" ? "modal" : "card",
        }}
      >
        <Stack.Screen
          name="MyDrawer"
          component={MyDrawer}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="Slider"
          component={SliderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Setting"
          component={SettingScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VideoScreen"
          component={VideoPlayScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WhatsappScreen"
          component={WhatsAppScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GalleryScreen"
          component={GalleryScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigatorApp;
