import { View, Text, BackHandler, Alert, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { BackArrow, BookmarkIcon, LeftArrowIcon } from "../../Icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function TopBar({
  setPreLoading,
  setInput,
  setVideoData,
  openModal,
}) {
  const navigation = useNavigation();
  function goBackHandler() {
    setPreLoading(false);
    setInput("");
    setVideoData("");
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", goBackHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", goBackHandler);
    };
  }, []);

  return (
    <>
      <TouchableWithoutFeedback onPress={goBackHandler}>
        <View
          className="rounded-full bg-white"
          style={{ padding: RFPercentage(0.5) }}
        >
          <BackArrow color={"#121212"} size={RFPercentage(3)} />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={openModal}>
        <View
          className="rounded-full bg-white"
          style={{ padding: RFPercentage(0.5) }}
        >
          <View
            className="rounded-full bg-[#121212]"
            style={{ padding: RFPercentage(0.6) }}
          >
            <BookmarkIcon size={RFPercentage(2)} color={"#ffffff"} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}
