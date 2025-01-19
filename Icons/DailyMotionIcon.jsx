import { Text } from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function DailyMotionIcon() {
  return (
    <Text
      className="text-white font-extrabold"
      style={{ fontSize: RFPercentage(4) }}
    >
      d
    </Text>
  );
}
