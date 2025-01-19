import React from "react";
import FormComp from "../components/Feedback/FormComp";
import Header from "../components/Header";
import { BackArrow } from "../Icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Text, View } from "react-native";

function FeedbackScreen() {
  const navigation = useNavigation();
  function goBackHandler() {
    navigation.goBack();
    return true;
  }
  return (
    <>
      <Header>
        <View className="flex-row justify-between items-center">
          <TouchableWithoutFeedback
            onPress={goBackHandler}
            style={{ marginRight: RFPercentage(2) }}
          >
            <View
              className="rounded-full bg-white"
              style={{ padding: RFPercentage(0.2) }}
            >
              <BackArrow color={"#121212"} size={RFPercentage(3)} />
            </View>
          </TouchableWithoutFeedback>
          <Text
            className="justify-center items-center font-bold text-white"
            style={{
              fontSize: RFPercentage(3),
            }}
          >
            Feedback
          </Text>
        </View>
      </Header>
      <FormComp />
    </>
  );
}

export default FeedbackScreen;
