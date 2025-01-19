import { View, Text, Image } from "react-native";
import React from "react";
import DownloadButton from "../Custom/DownloadButton";
import { RFPercentage } from "react-native-responsive-fontsize";
import TitleComp from "../Custom/TitleComp";
import PreviewComp from "../Custom/PreviewComp";
import { FlatList } from "react-native-gesture-handler";

export default function RedditMultiFormat({ videoData }) {
  return (
    <>
      <PreviewComp />
      <TitleComp title={videoData.title.replace(/amp;/g, "")} />
      <FlatList
        data={videoData.media_data}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: id }) => (
          <>
            <FlatList
              data={Object.keys(id)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View key={index} className="mx-auto">
                  <View
                    className="rounded-2xl bg-white overflow-hidden relative"
                    style={{
                      width: RFPercentage(45),
                      height: RFPercentage(30),
                      shadowColor: "black",
                      shadowOpacity: 0.26,
                      shadowOffset: { width: 0, height: 0 },
                      shadowRadius: 5,
                      elevation: 6,
                    }}
                  >
                    <Image
                      source={{
                        uri: `${id[item].s.u.replace(/amp;/g, "")}`,
                      }}
                      defaultSource={require("../../assets/ImageLoader.png")}
                      className="w-full h-full bg-white"
                      resizeMode="contain"
                    />
                  </View>
                  <DownloadButton
                    url={`${id[item].s.u.replace(/amp;/g, "")}`}
                    thumbnail={`${id[item].s.u.replace(/amp;/g, "")}`}
                    filetype={"jpg"}
                    heading={"Image"}
                  />
                </View>
              )}
            />
          </>
        )}
      />
    </>
  );
}
