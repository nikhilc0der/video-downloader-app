import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import downloadFunc from "./downloadFunc";
import { useNavigation } from "@react-navigation/native";

const YouTubePlaylist = ({ videoData }) => {
  const [click, setClick] = useState("");
  const [show, setShow] = useState(false);
  const [youtubeData, setYoutubeData] = useState();
  const [howMany, setHowMany] = useState([]);

  const handlePlay = (item) => {
    const url = item.shortUrl;
    setClick(item.id);
    setHowMany([]);
    fetch(`https://aiovideodownloader.com/api/youtube?url=${url}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data === "Request Failed With Code 401") {
          setYoutubeData("private");
        } else {
          setYoutubeData(data);
          handleShow();
          const filteredData = data.formats
            .filter(({ hasAudio, hasVideo }) => hasAudio && hasVideo)
            .map(async ({ qualityLabel, url }) => {
              const size = await getVideoSize(url);
              if (size) {
                return {
                  link: url,
                  quality: qualityLabel,
                  size: size,
                };
              }
            });
          Promise.all(filteredData).then((formattedData) => {
            setHowMany(formattedData);
          });
        }
      })
      .catch((error) => {
        console.error(`Error fetching youtube video data:`, error);
        if (error instanceof Error && error.message.includes("500")) {
          setYoutubeData("noVideo");
        }
      });
  };
  const handleShow = () => {
    setShow(true);
  };
  const { downloadFile } = downloadFunc();
  const navigation = useNavigation();
  const handleDownload = (url, thumbnail, fileType) => {
    const title = `aiovideodownloader.com_${youtubeData.videoDetails.title}`;
    const fileExtension =
      fileType === "weba"
        ? "weba"
        : fileType === "webm"
        ? "webm"
        : fileType === "mp3"
        ? "mp3"
        : "mp4";

    downloadFile(url, thumbnail, fileExtension, title);
  };

  async function getVideoSize(url) {
    try {
      const response = await fetch(url, {
        method: "HEAD",
      });
      const size = response.headers.get("content-length");
      return size
        ? `${(size / (1024 * 1024)).toFixed(2)} MB`
        : "Size not available";
    } catch (error) {
      return "Error getting size";
    }
  }

  return (
    <>
      {videoData.visibility ? (
        <>
          <View style={{ paddingHorizontal: RFPercentage(2) }}>
            <FlatList
              data={videoData.media}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <View
                  className="flex-row justify-between items-start w-[100%]"
                  style={{ marginVertical: RFPercentage(1) }}
                  key={index}
                >
                  <View
                    className="w-[49%] bg-slate-200 rounded-2xl"
                    style={{
                      height: RFPercentage(15),
                    }}
                  >
                    <Image
                      source={{
                        uri: item.bestThumbnail.url,
                      }}
                      defaultSource={require("../../assets/ImageLoader.png")}
                      resizeMode="contain"
                      className="w-[100%] h-[100%] object-cover rounded-2xl"
                    />
                  </View>
                  <View className="w-[49%]">
                    <Text
                      style={{ fontSize: RFPercentage(2) }}
                      className="w-[100%]"
                    >
                      {item.title}
                    </Text>
                    <Text style={{ fontSize: RFPercentage(2) }}>
                      {item.duration}
                    </Text>
                    {click !== item.id ? (
                      <View className="justify-end items-end">
                        <TouchableOpacity
                          onPress={() => handlePlay(item)}
                          className="justify-evenly items-center flex-row bg-[#ef473a] rounded-full w-[50%]"
                          style={{
                            padding: RFPercentage(1),
                          }}
                        >
                          <Text
                            className="text-white font-extrabold"
                            style={{ fontSize: RFPercentage(1.5) }}
                          >
                            Download
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <>
                        {!show && (
                          <Text className="text-black">Loading...</Text>
                        )}
                      </>
                    )}

                    {show && (
                      <>
                        {click == item.id && (
                          <>
                            <View className="flex-row justify-between items-center">
                              {howMany?.map((data, index) => (
                                <TouchableOpacity
                                  className="bg-[#ef473a] rounded-full flex-row justify-center items-center"
                                  style={{
                                    marginTop: RFPercentage(1),
                                    padding: RFPercentage(1),
                                  }}
                                  onPress={() =>
                                    handleDownload(
                                      data.link,
                                      item.bestThumbnail.url,
                                      "mp4"
                                    )
                                  }
                                  key={index}
                                >
                                  <Text
                                    className="text-white font-extrabold"
                                    style={{
                                      fontSize: RFPercentage(2),
                                    }}
                                  >
                                    {data.quality}
                                  </Text>
                                  <Text
                                    className="text-white font-extrabold"
                                    style={{
                                      fontSize: RFPercentage(1.3),
                                    }}
                                  >
                                    {" "}
                                    {data.size}
                                  </Text>
                                </TouchableOpacity>
                              ))}
                            </View>
                          </>
                        )}
                      </>
                    )}
                  </View>
                </View>
              )}
            />
          </View>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default YouTubePlaylist;
