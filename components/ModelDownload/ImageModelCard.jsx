import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { CrossIcon, DownloadIcon } from "../../Icons";

export default function ImageModelCard({
  urlImage,
  downloaderHandler,
  onClose,
  setUrlImage,
}) {
  return (
    <>
      {urlImage && (
        <View
          className="w-full h-[25%] bg-[#e6e6e6] absolute bottom-0 z-50"
          style={{ padding: RFPercentage(2) }}
        >
          <View className="flex-row justify-evenly items-center">
            <View>
              <Image
                source={{
                  uri: `${urlImage}`,
                }}
                defaultSource={require("../../assets/ImageLoader.png")}
                style={{
                  width: RFPercentage(20),
                  height: RFPercentage(10),
                }}
              />
            </View>
            <View>
              <Text>instagram</Text>
              <Pressable
                className="bg-slate-300 w-[70px] justify-center items-center"
                style={{
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
              className="justify-center items-center "
              onPress={() => onClose("image")}
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
                downloaderHandler(urlImage, urlImage, "jpg", "image")
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
    </>
  );
}
