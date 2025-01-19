import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import downloadFunc from "./downloadFunc";
import { useNavigation } from "@react-navigation/native";

const TikTokFormat = ({ videoData, showOptions }) => {
  const navigation = useNavigation();
  const { downloadFile } = downloadFunc();
  function downloadHandler(link, filetype) {
    downloadFile(link, videoData.previewImageUrl, filetype);
  }

  function PreviewHandler(url, filetype) {
    navigation.navigate("VideoScreen", {
      videolink: url,
      title: filetype,
    });
  }

  function renderBtn(link, filetype, text) {
    return (
      <View style={{ width: RFPercentage(45) }}>
        <View className="flex-row justify-between items-center w-full">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#d24b42",
              width: RFPercentage(14.8),
              marginBottom: RFPercentage(0.2),
              paddingHorizontal: RFPercentage(1),
              paddingVertical: RFPercentage(2),
            }}
          >
            <Text className="w-full text-left text-[#fff] font-semibold uppercase">
              {text}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => PreviewHandler(link, filetype)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#316FF6",
              marginBottom: RFPercentage(0.2),
              width: RFPercentage(14.8),
              paddingHorizontal: RFPercentage(1),
              paddingVertical: RFPercentage(2),
            }}
          >
            <Text className="w-full text-center text-[#fff] font-semibold uppercase">
              Preview
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => downloadHandler(link, filetype)}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "#24863b",
              width: RFPercentage(14.8),
              paddingHorizontal: RFPercentage(1),
              paddingVertical: RFPercentage(2),
              marginBottom: RFPercentage(0.2),
            }}
          >
            <Text className="w-full text-right text-[#fff] font-semibold uppercase">
              Download {filetype}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <>
      {showOptions && (
        <>
          {renderBtn(videoData.videoNoWatermark.url, "mp4", "No Watermark")}
          {renderBtn(videoData.videoWatermark.url, "mp4", "Watermark")}
          {renderBtn(videoData.music.url, "mp3", "Audio")}
        </>
      )}
    </>
  );
};

export default TikTokFormat;
