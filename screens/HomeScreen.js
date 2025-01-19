import React, { useCallback, useEffect } from "react";
import Navbar from "../components/home/Navbar";
import SearchArea from "../components/home/SearchArea";
import IconArea from "../components/home/IconArea";
import Feedback from "../components/home/Feedback";
import { useDispatch } from "react-redux";
import { changelabel } from "../redux/CreateTabSlice";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { alreadyHistoryItems } from "../redux/CreateHistory";
import { alreadyCollection } from "../redux/CollectionHistory";
import Header from "../components/Header";
import { LogBox, Platform, Text, TouchableWithoutFeedback } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

function HomeScreen({ drawerNavigation }) {
  LogBox.ignoreAllLogs();
  const drawerNavigationIndex = drawerNavigation.getState().index;
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(
        changelabel({
          icon: "Earth",
          label: "HomePage",
          color: "#fff",
          index: drawerNavigationIndex,
        })
      );
    }, [changelabel])
  );

  // AsyncStorage.clear();

  const createFolder = async () => {
    try {
      const folderName = "myFolder";
      const folderPath = FileSystem.documentDirectory + folderName;

      const folderExists = await FileSystem.getInfoAsync(folderPath);
      if (folderExists.exists && folderExists.isDirectory) {
        console.log("Folder already exists:", folderPath);
        return;
      }
      await FileSystem.makeDirectoryAsync(folderPath);
    } catch (error) {
      console.error("Failed to create or share folder:", error);
    }
  };

  useEffect(() => {
    (async () => {
      const historyItems =
        JSON.parse(await AsyncStorage.getItem("historyItems")) === null
          ? []
          : JSON.parse(await AsyncStorage.getItem("historyItems"));
      dispatch(alreadyHistoryItems(historyItems));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const CollectionItems =
        JSON.parse(await AsyncStorage.getItem("CollectionItems")) === null
          ? []
          : JSON.parse(await AsyncStorage.getItem("CollectionItems"));
      dispatch(alreadyCollection(CollectionItems));
    })();
  }, []);

  return (
    <>
      <Header>
        <Navbar />
      </Header>
      <SearchArea />
      {Platform.OS == "android" ? (
        <IconArea drawerNavigation={drawerNavigation} />
      ) : null}
      <TouchableWithoutFeedback
        className="bg-red-500 w-full h-screen"
        onPress={createFolder}
      >
        <Text>Click</Text>
      </TouchableWithoutFeedback>
      {/* <Feedback /> */}
    </>
  );
}

export default HomeScreen;
