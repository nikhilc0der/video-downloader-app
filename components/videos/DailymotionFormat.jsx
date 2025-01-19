import { useNavigation } from "@react-navigation/native";
import React from "react";
import downloadFunc from "./downloadFunc";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Text, View } from "react-native";

const DailymotionFormat = ({ showOptions, videoData }) => {
  const navigation = useNavigation();
  const { downloadFile } = downloadFunc();
  function downloadHandler(link, filetype) {
    downloadFile(link, videoData.thumbnail, filetype, videoData.title);
  }

  function PreviewHandler(url, filetype) {
    navigation.navigate("VideoScreen", {
      videolink: url,
      title: filetype,
    });
  }

  return (
    <>
      {showOptions && (
        <>
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
                      MP4 {item.size}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => PreviewHandler(item.link, "mp4")}
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
                    onPress={() => downloadHandler(item.link, "mp4")}
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
        </>
      )}
    </>
  );
};

export default DailymotionFormat;
