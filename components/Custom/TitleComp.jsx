import React from "react";
import { Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

function TitleComp({ title }) {
  return (
    <View style={{ marginTop: RFPercentage(1), width: RFPercentage(45) }}>
      <Text
        className="text-center"
        style={{
          marginVertical: RFPercentage(2),
          fontSize: RFPercentage(2),
        }}
      >
        Title : {title}...
      </Text>
    </View>
  );
}

export default TitleComp;
