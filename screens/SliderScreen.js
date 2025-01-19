import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SliderComp from "../components/Slider/SliderComp";
import Header from "../components/Header";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import { BackArrow } from "../Icons";
import { BackHandler, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

function SliderScreen() {
  const navigation = useNavigation();
  function goBackHandler() {
    navigation.goBack();
    return true;
  }
  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", goBackHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", goBackHandler);
    };
  });
  return (
    <>
      <Header>
        <TouchableWithoutFeedback onPress={goBackHandler}>
          <View
            className="rounded-full bg-white"
            style={{ padding: RFPercentage(0.5) }}
          >
            <BackArrow color={"#121212"} size={RFPercentage(3)} />
          </View>
        </TouchableWithoutFeedback>
      </Header>
      <SliderComp />
    </>
  );
}

export default SliderScreen;
