import React from "react";
import { Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

function NoHistory({ icon, text }) {
  return (
    <>
      <View
        className="justify-center items-center flex-1"
        style={{ gap: RFPercentage(2) }}
      >
        <View>{icon}</View>
        <Text
          className="text-gray-600 font-semibold text-center"
          style={{ fontSize: RFPercentage(2) }}
        >
          {text}
        </Text>
      </View>
    </>
  );
}

export default NoHistory;
