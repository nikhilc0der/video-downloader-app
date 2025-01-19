import React from "react";
import { Image, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import DownloadButton from "../Custom/DownloadButton";
import { FlatList } from "react-native-gesture-handler";
import PreviewComp from "../Custom/PreviewComp";

const InstaFormat = ({ videoData }) => {
  return (
    <>
      {videoData[0] ? (
        <>
          <PreviewComp />
          <FlatList
            data={videoData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              rowGap: RFPercentage(0.5),
              padding: RFPercentage(0.5),
            }}
            renderItem={({ item, index }) => (
              <View key={index}>
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
                      uri: item.thumbnail,
                    }}
                    defaultSource={require("../../assets/ImageLoader.png")}
                    className="w-full h-full bg-white"
                    resizeMode="contain"
                  />
                </View>

                <View className="mx-auto">
                  {item.newUrl.includes("d.rapidcdn.app") && (
                    <DownloadButton
                      url={item.newUrl}
                      thumbnail={item.thumbnail}
                      filetype={"mp4"}
                      heading={"Video"}
                    />
                  )}
                  {item.newUrl.includes("jpg") && (
                    <DownloadButton
                      url={item.newUrl}
                      thumbnail={item.thumbnail}
                      filetype={"jpg"}
                      heading={"Image"}
                    />
                  )}
                </View>
              </View>
            )}
          />
        </>
      ) : (
        <>
          {videoData.story ? (
            <>
              {videoData.video ? (
                <DownloadButton
                  url={videoData.video}
                  thumbnail={videoData.thumbnail}
                  filetype={"mp4"}
                  heading={"Video"}
                />
              ) : (
                <DownloadButton
                  url={videoData.thumbnail}
                  thumbnail={videoData.thumbnail}
                  filetype={"jpg"}
                  heading={"Image"}
                />
              )}
            </>
          ) : (
            <>
              {videoData.newUrl.includes("d.rapidcdn.app") && (
                <DownloadButton
                  url={videoData.newUrl}
                  thumbnail={videoData.thumbnail}
                  filetype={"mp4"}
                  heading={"Video"}
                />
              )}
              {videoData.newUrl.includes("jpg") && (
                <DownloadButton
                  url={videoData.newUrl}
                  thumbnail={videoData.thumbnail}
                  filetype={"jpg"}
                  heading={"Image"}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default InstaFormat;
