import React, { useMemo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BookmarkIcon, FileIcon, SettingIcon, TabIcon } from "../../Icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import FinishedScreen from "../../screens/FinishedScreen";
import SettingScreen from "../../screens/SettingScreen";
import CollectionScreen from "../../screens/CollectionScreen";
import HomeScreenNavigator from "./HomeScreenNavigator";
import { useSelector } from "react-redux";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();
function BottomTabNavigation({ navigation }) {
  const downloadprogress = useSelector((state) => state.addprogress);
  const { historyItems } = useSelector((state) => state.addHistory);
  const { collectionItem } = useSelector((state) => state.collection);
  const ProgressLength = useMemo(
    () => downloadprogress.filter((item) => item.Progress < 1),
    [downloadprogress]
  );

  return (
    <>
      <Tab.Navigator
        initialRouteName={"homeScreen"}
        screenOptions={{
          tabBarActiveTintColor: "#ef473a",
          tabBarInactiveTintColor: "grey",
          size: RFPercentage(4),
          tabBarStyle: Platform.OS == "android" ? styleAndroid : styleOs,
          tabBarLabelStyle:
            Platform.OS == "android"
              ? { marginBottom: RFPercentage(1), fontSize: RFPercentage(1.5) }
              : { fontSize: RFPercentage(1.5) },
          tabBarHideOnKeyboard: true,
        }}
      >
        <Tab.Screen
          name={"Tabs"}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <TabIcon size={size} color={color} />
            ),
          }}
        >
          {(props) => (
            <HomeScreenNavigator {...props} drawerNavigation={navigation} />
          )}
        </Tab.Screen>
        <Tab.Screen
          name={"Downloads"}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FileIcon size={size} color={color} />
            ),
            tabBarBadge: historyItems.flat(1).length,
          }}
        >
          {(props) => (
            <FinishedScreen {...props} FinishLength={historyItems.flat(1)} />
          )}
        </Tab.Screen>
        <Tab.Screen
          name={"Collections"}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <BookmarkIcon size={size} color={color} />
            ),
            tabBarBadge: collectionItem.length,
          }}
        >
          {(props) => <CollectionScreen {...props} />}
        </Tab.Screen>
        <Tab.Screen
          name={"Settings"}
          component={SettingScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <SettingIcon size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

export default BottomTabNavigation;

const styleAndroid = {
  height: RFPercentage(8),
  backgroundColor: "#fff",
  borderRadius: RFPercentage(1),
  position: "relative",
  bottom: RFPercentage(1),
  marginHorizontal: RFPercentage(1.5),
  shadowColor: "black",
  elevation: 10,
};

const styleOs = {
  height: RFPercentage(10),
};
