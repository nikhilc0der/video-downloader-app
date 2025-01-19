import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import downloadFunc from "../videos/downloadFunc";

function DownloadButton({ url, thumbnail, filetype, heading }) {
  const navigation = useNavigation();
  const { downloadFile } = downloadFunc();
  function downloadHandler() {
    downloadFile(url, thumbnail, filetype);
  }

  function PreviewHandler() {
    navigation.navigate("VideoScreen", {
      videolink: url,
      title: filetype,
    });
  }

  return (
    <View
      className="flex-row justify-between items-center "
      style={{ width: RFPercentage(45) }}
    >
      <TouchableOpacity
        onPress={PreviewHandler}
        className="justify-evenly items-center flex-row bg-[#316FF6] rounded-full"
        style={{
          width: RFPercentage(22),
          marginVertical: RFPercentage(2),
          padding: RFPercentage(2),
        }}
      >
        <Text
          className="text-white font-extrabold"
          style={{ fontSize: RFPercentage(2) }}
        >
          Preview
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={downloadHandler}
        className="justify-evenly items-center flex-row bg-[#ef473a] rounded-full"
        style={{
          width: RFPercentage(22),
          marginVertical: RFPercentage(2),
          padding: RFPercentage(2),
        }}
      >
        <Text
          className="text-white font-extrabold"
          style={{ fontSize: RFPercentage(2) }}
        >
          Download {heading}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default DownloadButton;
