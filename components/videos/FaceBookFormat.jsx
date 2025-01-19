import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import downloadFunc from "./downloadFunc";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import DownloadButton from "../Custom/DownloadButton";

const FaceBookFormat = ({ videoData, showOptions }) => {
  const navigation = useNavigation();
  const { downloadFile } = downloadFunc();

  function downloadHandler(link, filetype) {
    downloadFile(link, videoData.thumbnail, filetype);
  }

  function PreviewHandler(url, filetype) {
    navigation.navigate("VideoScreen", {
      videolink: url,
      title: filetype,
    });
  }

  function renderBtn(link, filetype) {
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
            <Text className="w-full text-center text-[#fff] font-semibold uppercase">
              {filetype}
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
            <Text className="w-full text-center text-[#fff] font-semibold uppercase">
              Download
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const renderOptions = () => {
    return (
      <View>
        {videoData.hd && renderBtn(videoData.hd, "mp4")}
        {videoData.sd && renderBtn(videoData.sd, "mp4")}
      </View>
    );
  };

  return (
    <>
      {showOptions && renderOptions()}
      {videoData.image && (
        <DownloadButton
          url={videoData.imageUrl}
          thumbnail={videoData.thumbnail}
          filetype={"jpg"}
          heading={"Image"}
        />
      )}
    </>
  );
};

export default FaceBookFormat;
