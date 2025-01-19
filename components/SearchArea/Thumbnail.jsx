import React from "react";
import { View, Text, Image } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import PreviewComp from "../Custom/PreviewComp";
import TitleComp from "../Custom/TitleComp";
import RenderThumbnail from "../Custom/RenderThumbnail";

const Thumbnail = ({ videoData, domain }) => {
  function YouTubeThumbnailSingleVideo() {
    return (
      <>
        <PreviewComp />
        <View
          className="rounded-2xl bg-white  overflow-hidden relative"
          style={{
            height: RFPercentage(30),
            shadowColor: "black",
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 3,
            elevation: 3,
          }}
        >
          <Image
            source={{
              uri: videoData.thumbnail,
            }}
            defaultSource={require("../../assets/ImageLoader.png")}
            className="w-full h-full bg-white"
            resizeMode="contain"
          />
        </View>
        <TitleComp title={videoData.title} />
      </>
    );
  }

  function YouTubePlaylistThumbnail() {
    return (
      <>
        <View
          className="bg-slate-200 w-[100%] rounded-xl"
          style={{ padding: RFPercentage(2) }}
        >
          <PreviewComp />
          <View
            style={{
              height: RFPercentage(15),
            }}
            className="flex-row justify-between items-center"
          >
            <View className="w-[49%]">
              <Image
                source={{ uri: videoData.thumbnail }}
                defaultSource={require("../../assets/ImageLoader.png")}
                resizeMode="cover"
                className="w-[100%] h-[100%] rounded-xl"
              />
            </View>
            <View className="flex-col w-[49%]">
              <Text className="font-bold">
                {videoData.title.slice(0, 40)}...
              </Text>
              <Text style={{ paddingBottom: RFPercentage(0.5) }}>
                {videoData.channel}
              </Text>
              <Text className="font-medium">
                {videoData.total} Videos |<Text> {videoData.lastUpdated}</Text>
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  }

  const YouTubeThumbnail = () => {
    if (videoData.visibility) {
      return YouTubePlaylistThumbnail();
    } else {
      return YouTubeThumbnailSingleVideo();
    }
  };

  switch (domain) {
    case "youtube.com":
    case "youtu.be":
    case "y2u.be":
      return <>{YouTubeThumbnail()}</>;

    case "tiktok.com":
      return (
        <>
          <RenderThumbnail
            thumbnail={videoData.previewImageUrl}
            title={videoData.description}
          />
        </>
      );

    case "threads.net":
      return (
        <>
          <RenderThumbnail
            thumbnail={`${
              (videoData.media[0].thumbnail &&
                videoData.media[0].thumbnail[0].url) ||
              videoData.media[0].media[0].url
            }`}
            title={videoData.media[0].caption}
          />
        </>
      );

    case "instagram.com":
      return (
        <>
          <RenderThumbnail
            thumbnail={videoData.thumbnail}
            condition={Array.isArray(videoData)}
          />
        </>
      );

    case "dailymotion.com":
    case "dai.ly":
      return (
        <>
          <RenderThumbnail
            thumbnail={videoData.thumbnail}
            title={videoData.title}
          />
        </>
      );

    case "vimeo.com":
    case "player.vimeo.com":
      return (
        <>
          <RenderThumbnail
            thumbnail={videoData.video.length > 0 && videoData.thumbnail}
            title={videoData.title}
          />
        </>
      );

    case "fb.watch":
    case "facebook.com":
      return (
        <>
          <RenderThumbnail
            thumbnail={videoData.thumbnail}
            title={videoData.title}
          />
        </>
      );

    case "in.pinterest.com":
    case "pin.it":
      return (
        <>
          <RenderThumbnail
            thumbnail={
              videoData.videos ? videoData.thumbnail : videoData.images.src
            }
            title={videoData.images.alt}
          />
        </>
      );

    case "twitter.com":
    case "x.com":
      return (
        <>
          <RenderThumbnail
            thumbnail={
              videoData.text === ""
                ? null
                : videoData.media_extended[0].thumbnail_url
            }
            condition={
              !videoData.media_extended[0].thumbnail_url ||
              videoData.media_extended.length === 0
            }
            title={videoData.text.slice(0, 90)}
          />
        </>
      );

    case "reddit.com":
      return (
        <>
          <RenderThumbnail
            thumbnail={
              videoData?.media_data?.length > 0 ? null : videoData.thumbnail
            }
            title={videoData.title}
          />
        </>
      );
    default:
      return null;
  }
};

export default Thumbnail;
