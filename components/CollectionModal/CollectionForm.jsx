import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  ToastAndroid,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { CrossIcon } from "../../Icons";
import { useDispatch } from "react-redux";
import { addToCollection } from "../../redux/CollectionHistory";

export default function CollectionForm({
  domain,
  isCollection,
  setCollection,
  videoData,
}) {
  const [collectionValue, setCollectionValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const id = new Date().getTime();
  function dispatchHandlerArray(data, id) {
    dispatch(
      addToCollection({
        id: id,
        collectionName: collectionValue,
        collectionArray: [...data],
      })
    );
    Platform.OS === "android"
      ? ToastAndroid.show(
          `Saved to ${collectionValue} Collection`,
          ToastAndroid.LONG
        )
      : Alert.alert(`Saved to ${collectionValue} Collection`);
  }

  function dispatchHandler(link, thumbnail, id) {
    dispatch(
      addToCollection({
        id: id,
        collectionName: collectionValue,
        collectionArray: [
          {
            newUrl: link,
            thumbnail: thumbnail,
          },
        ],
      })
    );
    Platform.OS === "android"
      ? ToastAndroid.show(
          `Saved to ${collectionValue} Collection`,
          ToastAndroid.LONG
        )
      : Alert.alert(`Saved to ${collectionValue} Collection`);
  }
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  }, [errorMessage]);
  const handleSubmit = () => {
    if (collectionValue) {
      setCollectionValue("");
      setCollection(false);
      if (domain == "tiktok.com") {
        dispatchHandler(
          videoData.videoNoWatermark.url,
          videoData.previewImageUrl,
          id
        );
      } else if (domain == "threads.net") {
        videoData.media[0].type == "video"
          ? dispatchHandler(
              videoData.media[0].media[0].url,
              `${
                (videoData.media[0].thumbnail &&
                  videoData.media[0].thumbnail[0].url) ||
                videoData.media[0].media[0].url
              }`,
              id
            )
          : dispatchHandler(
              videoData.media[0].media[0].url,
              `${
                (videoData.media[0].thumbnail &&
                  videoData.media[0].thumbnail[0].url) ||
                videoData.media[0].media[0].url
              }`,
              id
            );
      } else if (domain == "instagram.com") {
        videoData[0] ? (
          dispatchHandlerArray(videoData, id)
        ) : (
          <>
            {videoData.story ? (
              <>
                {videoData.video
                  ? dispatchHandler(videoData.video, videoData.thumbnail, id)
                  : dispatchHandler(
                      videoData.thumbnail,
                      videoData.thumbnail,
                      id
                    )}
              </>
            ) : (
              <>
                {videoData.newUrl.includes("d.rapidcdn.app") &&
                  dispatchHandler(videoData.newUrl, videoData.thumbnail, id)}
                {videoData.newUrl.includes("jpg") &&
                  dispatchHandler(videoData.newUrl, videoData.thumbnail, id)}
              </>
            )}
          </>
        );
      } else if (domain == "dailymotion.com" || domain == "dai.ly") {
        dispatchHandler(videoData.video[0].link, videoData.thumbnail, id);
      } else if (domain == "vimeo.com" || domain == "player.vimeo.com") {
        videoData.video.length > 0
          ? dispatchHandler(videoData.video[1].url, videoData.thumbnail, id)
          : Platform.OS === "android"
          ? ToastAndroid.show(
              "this file is not exists in your file manager",
              ToastAndroid.LONG
            )
          : Alert.alert("download link not found");
      } else if (domain == "facebook.com" || domain == "fb.watch") {
        let link = videoData.hd ? videoData.hd : videoData.newUrl;
        dispatchHandler(link, videoData.thumbnail, id);
      } else if (domain == "in.pinterest.com" || domain == "pin.it") {
        if (videoData.video) {
          dispatchHandler(videoData.video, videoData.thumbnail, id);
        } else {
          dispatchHandler(videoData.images.src, videoData.images.src, id);
        }
      } else if (domain == "twitter.com" || domain == "x.com") {
        const imageUrl = videoData.media_extended[0]?.url;
        const isVideo = videoData.media_extended[0]?.type === "video";
        const isGif = videoData.media_extended[1]?.type === "gif";
        if (isVideo) {
          dispatchHandler(
            videoData.media_extended[0].url,
            videoData.media_extended[0].thumbnail_url,
            id
          );
        } else if (!isVideo && !isGif && imageUrl) {
          dispatchHandler(videoData.mediaURLs[0], videoData.mediaURLs[0], id);
        } else if (!isVideo && isGif) {
          dispatchHandler(videoData.mediaURLs[1], videoData.mediaURLs[0], id);
        }
      } else if (domain == "reddit.com") {
        const audioUrl = videoData.audio;
        const videoUrl = videoData.media;
        let gifUrl;
        if (videoData.gif) {
          gifUrl = videoData.gif.replace(/amp;/g, "");
        }
        const url = `https://sd.rapidsave.com/download.php?permalink=https://www.reddit.com/${videoData.permalink}&video_url=${videoUrl}&audio_url=${audioUrl}`;

        let arr = [];
        if (videoData?.media_data?.length > 0) {
          videoData.media_data.map((id) =>
            Object.keys(id).map((item) =>
              arr.push({
                newUrl: `${id[item].s.u.replace(/amp;/g, "")}`,
                thumbnail: `${id[item].s.u.replace(/amp;/g, "")}`,
              })
            )
          );
        }

        {
          videoData?.media_data?.length > 0 ? (
            arr.length > 0 ? (
              dispatchHandlerArray(arr, id)
            ) : Platform.OS === "android" ? (
              ToastAndroid.show(
                "this file is not exists in your file manager",
                ToastAndroid.LONG
              )
            ) : (
              Alert.alert("not found data")
            )
          ) : (
            <>
              {videoData.video
                ? dispatchHandler(url, videoData.thumbnail, id)
                : videoData.gif
                ? dispatchHandler(gifUrl, videoData.thumbnail, id)
                : dispatchHandler(videoData.thumbnail, videoData.thumbnail, id)}
            </>
          );
        }
      }
    } else {
      setErrorMessage("Please Enter Name Of Your Collection");
    }
  };
  return (
    <>
      <View
        className={`absolute top-0 w-full h-full opacity-50 bg-black ${
          isCollection ? "flex-col" : "hidden"
        }`}
        style={{ zIndex: 101 }}
      ></View>

      <View style={{ zIndex: 110 }}>
        <Modal visible={isCollection} animationType="slide" transparent={true}>
          <View className="w-full h-full justify-center items-center">
            <View
              className="bg-gray-200 rounded-2xl"
              style={{ width: RFPercentage(40) }}
            >
              <View
                className="border-gray-300"
                style={{
                  padding: RFPercentage(3),
                  borderBottomWidth: RFPercentage(0.1),
                }}
              >
                <Text
                  className="text-gray-800 text-center font-bold"
                  style={{
                    marginTop: RFPercentage(0.5),
                    fontSize: RFPercentage(2),
                  }}
                >
                  Collection Name
                </Text>
              </View>
              <View
                className="w-[90%] mx-auto rounded-xl flex-row items-center bg-gray-300"
                style={{
                  marginTop: RFPercentage(1.5),
                  marginBottom: RFPercentage(1.5),
                  padding: RFPercentage(2),
                }}
              >
                <TextInput
                  style={{ fontSize: RFPercentage(2) }}
                  value={collectionValue}
                  onChangeText={setCollectionValue}
                  numberOfLines={1}
                  className="flex-1 font-semibold overflow-hidden"
                  placeholder="Enter the Collection Name"
                  placeholderTextColor={"#000"}
                />
                {collectionValue && (
                  <TouchableOpacity onPress={() => setCollectionValue("")}>
                    <CrossIcon color={"#000"} size={RFPercentage(3)} />
                  </TouchableOpacity>
                )}
              </View>
              {errorMessage && (
                <Text
                  className="text-red-500 text-center"
                  style={{ marginBottom: RFPercentage(1.5) }}
                >
                  {errorMessage}
                </Text>
              )}
              <View
                className="border-gray-300 flex-row"
                style={{
                  borderTopWidth: RFPercentage(0.1),
                }}
              >
                <View
                  className="w-1/2 border-gray-300"
                  style={{
                    padding: RFPercentage(2),
                    borderRightWidth: RFPercentage(0.1),
                  }}
                >
                  <TouchableOpacity onPress={() => setCollection(false)}>
                    <Text
                      className="text-center font-extrabold text-sky-700"
                      style={{ fontSize: RFPercentage(2) }}
                    >
                      cancel
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="w-1/2" style={{ padding: RFPercentage(2) }}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text
                      className="text-center font-extrabold"
                      style={{
                        fontSize: RFPercentage(2),
                        color: "red",
                      }}
                    >
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
