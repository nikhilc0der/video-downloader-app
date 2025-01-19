import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  Text,
  ToastAndroid,
  View,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import multiicons from "../../constants/multiicon";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { changelabel } from "../../redux/CreateTabSlice";
import { useDispatch } from "react-redux";
import { linkStore } from "../../redux/CreateLinkSave";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

function IconArea({ drawerNavigation }) {
  const drawerNavigationIndex = drawerNavigation.getState().index;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  async function accessWhatsAppStatuses() {
    // const directoryToSave = await AsyncStorage.getItem("setwhats");
    // if (directoryToSave) {
    await directoryFunc(
      "content://com.android.externalstorage.documents/tree/primary%3AAndroid%2Fmedia%2Fcom.whatsapp%2FWhatsApp%2FMedia%2F.Statuses"
    );
    // } else {
    //   const permissions =
    //     await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    //   if (!permissions.granted) {
    //     alert("Sorry, we need media library permissions to make this work!");
    //     return;
    //   }
    //   await AsyncStorage.setItem("setwhats", permissions.directoryUri);
    //   await directoryFunc(permissions.directoryUri);
    // }
  }

  async function directoryFunc(directoryLink) {
    try {
      const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(
        directoryLink
      );
      if (files.length >= 2) {
        navigation.navigate("WhatsappScreen", {
          files: files,
        });
      } else {
        Platform.OS === "android"
          ? ToastAndroid.show("not found", ToastAndroid.LONG)
          : Alert.alert("not found");
      }
    } catch (error) {
      console.error("Error reading directory: ", error);
    }
  }

  const createGrid = (data) => {
    const toAddExtraBlock = data.length % 4;
    if (toAddExtraBlock === 2) {
      data.push("extra");
      data.push("extra");
    }
    return data;
  };

  return (
    <>
      <View className="">
        <FlatList
          data={createGrid(multiicons)}
          showsVerticalScrollIndicator={false}
          numColumns={4}
          contentContainerStyle={{
            rowGap: RFPercentage(0.5),
          }}
          columnWrapperStyle={{ gap: RFPercentage(0.5) }}
          renderItem={({ item, index }) => (
            <View key={index} className="flex-1">
              <TouchableOpacity
                onPress={async () => {
                  dispatch(
                    changelabel({
                      index: drawerNavigationIndex,
                      icon: item.title,
                      label: item.title,
                      color: item.color,
                      link: item.link,
                    })
                  );
                  if (item.title == "Whatsapp") {
                    accessWhatsAppStatuses();
                  } else {
                    dispatch(linkStore(item.link));
                    navigation.navigate("BrowserScreen");
                  }
                }}
              >
                <View
                  className="rounded-full justify-center items-center m-auto text-white font-extrabold"
                  style={{
                    width: RFPercentage(8),
                    height: RFPercentage(8),
                    backgroundColor: item.color,
                    fontSize: RFPercentage(4.5),
                  }}
                >
                  {item.icon}
                </View>
                <View className="items-center">
                  <Text
                    numberOfLines={1}
                    className=""
                    style={{
                      fontSize: RFPercentage(1.6),
                      marginVertical: RFPercentage(1),
                    }}
                  >
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </>
  );
}

export default IconArea;

// "content://com.android.externalstorage.documents/tree/primary%3AAndroid%2Fmedia%2Fcom.whatsapp%2FWhatsApp%2FMedia%2F.Statuses"
