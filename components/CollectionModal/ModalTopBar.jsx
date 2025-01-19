import { View, Text, Image } from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import BookmarkThumbnail from "../../javascript/BookmarkThumbnail";

export default function ModalTopBar({
  border,
  icon,
  text,
  closeModal,
  videoData,
  domain,
  thumbnail,
}) {
  const image = BookmarkThumbnail(videoData, domain);
  return (
    <>
      <View className="justify-between items-center flex-row">
        <View className="justify-start items-center flex-row">
          <View
            className="bg-white overflow-hidden relative"
            style={{
              width: RFPercentage(7),
              height: RFPercentage(7),
              borderRadius: RFPercentage(2),
              elevation: 4,
            }}
          >
            <Image
              source={{
                uri: `${border ? thumbnail : image}`,
              }}
              defaultSource={require("../../assets/ImageLoader.png")}
              className="w-full h-full bg-white"
              resizeMode="contain"
            />
          </View>
          <Text style={{ marginLeft: RFPercentage(1) }}>{text}</Text>
        </View>
        <TouchableOpacity onPress={closeModal}>
          {!border && (
            <View
              className="rounded-full bg-slate-200"
              style={{ padding: RFPercentage(0.5) }}
            >
              <View
                className="rounded-full bg-[#121212]"
                style={{ padding: RFPercentage(0.6) }}
              >
                {icon}
              </View>
            </View>
          )}
          {border && (
            <View
              className="rounded-full bg-slate-200"
              style={{ padding: RFPercentage(0.5) }}
            >
              {icon}
            </View>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
