import React from "react";
import { Text, View } from "react-native";
import { FaqIcon } from "../../Icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

function HowtoDownload() {
  const navigation = useNavigation();
  return (
    <>
      <View className="">
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("Slider")}
          className="justify-center items-center"
        >
          <View
            className="flex-row justify-center items-center bg-[#cbd5e1] w-[90%] m-auto"
            style={{
              borderRadius: RFPercentage(2),
              padding: RFPercentage(1),
              marginBottom: RFPercentage(3),
              marginTop: RFPercentage(2),
            }}
          >
            <FaqIcon color={"#ef473a"} size={RFPercentage(3)} />
            <Text className="text-[#ef473a] pl-[6px]">How to Download</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}

export default HowtoDownload;
