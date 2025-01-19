import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { CrossIcon, DownloadIcon } from "../../Icons";
import { FlatList } from "react-native-gesture-handler";

export default function VideoModelCard({
  videoData,
  downloaderHandler,
  onClose,
}) {
  return (
    <>
      <FlatList
        data={videoData}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{
          rowGap: RFPercentage(0.5),
          padding: RFPercentage(0.5),
        }}
        columnWrapperStyle={{ gap: RFPercentage(0.5) }}
        renderItem={({ item, index }) => (
          <View
            className="w-full h-[25%] bg-[#e6e6e6] absolute bottom-0 z-50"
            style={{ padding: RFPercentage(2) }}
            key={index}
          >
            <View className="flex-row justify-evenly items-center">
              <View>
                <Image
                  source={{
                    uri: `${item.thumbnail}`,
                  }}
                  defaultSource={require("../../assets/ImageLoader.png")}
                  style={{
                    width: RFPercentage(20),
                    height: RFPercentage(10),
                  }}
                />
              </View>
              <View>
                <Text>Instagram</Text>
                <Pressable
                  className="bg-slate-300 justify-center items-center"
                  style={{
                    width: RFPercentage(4),
                    borderRadius: RFPercentage(2),
                    marginTop: RFPercentage(1),
                  }}
                >
                  <Text className="text-center text-[#ef473a]">Rename</Text>
                </Pressable>
              </View>
            </View>
            <View
              className="flex-row justify-evenly items-center"
              style={{ marginTop: RFPercentage(4) }}
            >
              <Pressable
                className="justify-center items-center"
                onPress={() => onClose("video")}
              >
                <View
                  className="border-[2px] border-[#121212]"
                  style={{
                    borderRadius: RFPercentage(10),
                    padding: RFPercentage(0.7),
                  }}
                >
                  <CrossIcon color={"#121212"} size={RFPercentage(3.3)} />
                </View>
                <Text className="font-semibold">Close</Text>
              </Pressable>
              <Pressable
                className="justify-center items-center"
                onPress={() =>
                  downloaderHandler(
                    videoData[0].url,
                    videoData[0].thumbnail,
                    "mp4"
                  )
                }
              >
                <View
                  className="border-[2px] border-[#121212] mb-[3px]"
                  style={{
                    borderRadius: RFPercentage(10),
                    padding: RFPercentage(0.7),
                  }}
                >
                  <DownloadIcon color={"#121212"} size={RFPercentage(3)} />
                </View>

                <Text className="font-semibold">Download</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </>
  );
}
