import React from "react";
import { Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import { RightArrowIcon } from "../../Icons";

const RenderSelectBtn = ({ handlePick, showOptions }) => (
  <>
    <Text style={{ fontSize: RFPercentage(2.2) }} className="text-center">
      Choose Quality And Click To Download
    </Text>
    <View className="justify-center items-center mx-auto">
      <TouchableWithoutFeedback
        onPress={handlePick}
        className={`justify-center items-center flex-row bg-[#ef473a] transition-all duration-300 ${
          showOptions == false
            ? "rounded-t-full rounded-l-full rounded-r-full rounded-b-full"
            : "rounded-t-full"
        }`}
        style={{
          width: RFPercentage(45),
          padding: RFPercentage(2),
          marginTop: RFPercentage(2),
        }}
      >
        <Text
          className="text-white font-extrabold"
          style={{ fontSize: RFPercentage(3), marginRight: RFPercentage(1) }}
        >
          Select
        </Text>
        <View
          className={`rotate-90 ${
            showOptions == false ? "rotate-120" : "rotate-180"
          }`}
        >
          <RightArrowIcon size={RFPercentage(3)} color={`#ffffff`} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  </>
);

export default RenderSelectBtn;
