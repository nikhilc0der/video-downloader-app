import { View, Text } from "react-native";
import React from "react";
import Thumbnail from "./Thumbnail";
import DomainCheck from "./DomainCheck";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function ShowVideoData({ videoData, domain }) {
  return (
    <View>
      {(typeof videoData != "string" && (
        <>
          {!videoData?.media_data?.length > 0 && !videoData[0] && (
            <View
              className="mx-auto w-full"
              style={{ padding: RFPercentage(2) }}
            >
              <Thumbnail videoData={videoData} domain={domain} />
            </View>
          )}
          <View className="mx-auto">
            <View className="relative w-full">
              <DomainCheck domain={domain} videoData={videoData} />
            </View>
          </View>
        </>
      )) || (
        <Text
          className="font-bold text-red-500 text-center"
          style={{
            fontSize: RFPercentage(2.5),
            marginVertical: RFPercentage(4),
          }}
        >
          {videoData}
        </Text>
      )}
    </View>
  );
}
