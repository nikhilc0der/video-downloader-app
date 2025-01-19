import React from "react";
import { Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

function TopComp() {
  return (
    <>
      <View className="bg-white">
        <View
          style={{
            marginHorizontal: RFPercentage(2),
          }}
        >
          <Text
            style={{
              fontSize: RFPercentage(2.8),
              marginVertical: RFPercentage(1.5),
            }}
            className="font-bold"
          >
            Tell us the problem you encountered
          </Text>
        </View>
      </View>
    </>
  );
}

export default TopComp;
