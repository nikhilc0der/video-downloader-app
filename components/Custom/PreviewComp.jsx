import React from "react";
import { Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const PreviewComp = () => {
  return (
    <View
      className="justify-center items-center"
      style={{ marginVertical: RFPercentage(1.5) }}
    >
      <Text
        style={{
          fontSize: RFPercentage(3),
        }}
      >
        Preview
      </Text>
    </View>
  );
};

export default PreviewComp;
