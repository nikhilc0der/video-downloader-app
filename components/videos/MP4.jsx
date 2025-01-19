import React from "react";
import { View, Text } from "react-native";
import { MuteIcon } from "../../Icons";
import { RFPercentage } from "react-native-responsive-fontsize";

const MP4 = ({
  container,
  qualityLabel,
  hasAudio,
  index,
  audioBitrate,
  codecs,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: RFPercentage(1),
        width: RFPercentage(45),
      }}
      key={index}
      className="mx-auto"
    >
      <Text className="uppercase">
        {codecs === "opus" ? "Audio OPUS" : container}
      </Text>

      <Text
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        {hasAudio ? (
          <Text className="uppercase">
            {qualityLabel ? qualityLabel.replace("p", "") : audioBitrate}
          </Text>
        ) : (
          <View className="justify-center items-center flex-row">
            <View>
              <MuteIcon size={RFPercentage(3)} color="#ff0000" />
            </View>
            <Text>
              {qualityLabel ? qualityLabel.replace("p", "") : audioBitrate}
            </Text>
          </View>
        )}
      </Text>
    </View>
  );
};

export default MP4;
