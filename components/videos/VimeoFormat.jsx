import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import downloadFunc from "./downloadFunc";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";

const VimeoFormat = ({ videoData, showOptions }) => {
  const navigation = useNavigation();
  const { downloadFile } = downloadFunc();
  let title = videoData.title;
  function downloadHandler(link, filetype) {
    downloadFile(link, videoData.thumbnail, filetype, title);
  }

  function PreviewHandler(url, filetype) {
    navigation.navigate("VideoScreen", {
      videolink: url,
      title: filetype,
    });
  }

  const renderOptions = () => {
    return (
      <FlatList
        data={videoData.video}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={{ width: RFPercentage(45) }} key={index}>
            <View className="flex-row justify-between items-center w-full">
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "#d24b42",
                  width: RFPercentage(14.8),
                  paddingHorizontal: RFPercentage(0),
                  paddingVertical: RFPercentage(2),
                  marginBottom: RFPercentage(0.2),
                }}
              >
                <Text className="w-full text-center text-[#fff] font-semibold uppercase">
                  {item.quality} (MP4)
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => PreviewHandler(item.url, "mp4")}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "#316FF6",
                  width: RFPercentage(14.8),
                  paddingHorizontal: RFPercentage(0),
                  paddingVertical: RFPercentage(2),
                  marginBottom: RFPercentage(0.2),
                }}
              >
                <Text className="text-center w-full text-[#fff] font-semibold uppercase">
                  Preview
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => downloadHandler(item.url, "mp4")}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "#24863b",
                  width: RFPercentage(14.8),
                  paddingHorizontal: RFPercentage(0),
                  paddingVertical: RFPercentage(2),
                  marginBottom: RFPercentage(0.2),
                }}
              >
                <Text className="w-full text-center text-[#fff] font-semibold uppercase">
                  Download
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    );
  };

  return <>{showOptions && <>{renderOptions()}</>}</>;
};

export default VimeoFormat;
