import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { RFPercentage } from "react-native-responsive-fontsize";
import BottomTabNavigation from "./BottomTabNavigation";
import UserView from "../Drawer/UserView";
import { useSelector } from "react-redux";
import { Platform } from "react-native";

const Drawer = createDrawerNavigator();
export default function MyDrawer() {
  const tabsArr = useSelector((state) => state.addtabs);
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          drawerType: "front",
          drawerStyle: { width: RFPercentage(30) },
        }}
        drawerContent={({ navigation, ...props }) => {
          return <UserView navigation={navigation} {...props} />;
        }}
      >
        {tabsArr.map((item, index) => (
          <Drawer.Screen
            key={index}
            name={`tab-${index}`}
            component={BottomTabNavigation}
            options={{
              headerShown: false,
              drawerItemStyle: { display: "none" },
            }}
          />
        ))}
      </Drawer.Navigator>
    </>
  );
}
