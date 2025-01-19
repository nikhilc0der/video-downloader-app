import React, { useState } from "react";
import { Text } from "react-native";
import {
  YouTubeFormat,
  TikTokFormat,
  ThreadsFormat,
  InstaFormat,
  VimeoFormat,
  FaceBookFormat,
  TwitterFormat,
  DailymotionFormat,
  PinterestFormat,
  YouTubePlaylist,
  RedditFormat,
} from "../videos";
import { RFPercentage } from "react-native-responsive-fontsize";
import RenderSelectBtn from "../Custom/RenderSelectBtn";

const DomainCheck = ({ domain, videoData }) => {
  const [showOptions, setShowOption] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const handlePick = () => {
    setShowOption(!showOptions);
  };
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  switch (domain) {
    case "youtube.com":
    case "youtu.be":
    case "y2u.be":
      return (
        <>
          {videoData?.visibility ? (
            <YouTubePlaylist videoData={videoData} domain={domain} />
          ) : (
            <>
              <RenderSelectBtn
                handlePick={handlePick}
                showOptions={showOptions}
              />
              <YouTubeFormat
                title={videoData.title}
                showMore={showMore}
                showOptions={showOptions}
                toggleShowMore={toggleShowMore}
                videoData={videoData}
              />
            </>
          )}
        </>
      );

    case "tiktok.com":
      return (
        <>
          <RenderSelectBtn handlePick={handlePick} showOptions={showOptions} />
          <TikTokFormat videoData={videoData} showOptions={showOptions} />
        </>
      );

    case "threads.net":
      return <ThreadsFormat videoData={videoData} showOptions={showOptions} />;

    case "instagram.com":
      return <InstaFormat videoData={videoData} />;

    case "dailymotion.com":
    case "dai.ly":
      return (
        <>
          <RenderSelectBtn handlePick={handlePick} showOptions={showOptions} />
          <DailymotionFormat videoData={videoData} showOptions={showOptions} />
        </>
      );

    case "vimeo.com":
    case "player.vimeo.com":
      return videoData.video.length > 0 ? (
        <>
          <RenderSelectBtn handlePick={handlePick} showOptions={showOptions} />
          <VimeoFormat videoData={videoData} showOptions={showOptions} />
        </>
      ) : (
        <>
          <Text
            className="font-bold text-red-500"
            style={{ fontSize: RFPercentage(2.5) }}
          >
            The download link is not found.
          </Text>
        </>
      );

    case "fb.watch":
    case "facebook.com":
      return (
        <>
          {!videoData.image && (
            <RenderSelectBtn
              handlePick={handlePick}
              showOptions={showOptions}
            />
          )}
          <FaceBookFormat videoData={videoData} showOptions={showOptions} />
        </>
      );

    case "in.pinterest.com":
    case "pin.it":
      return <PinterestFormat videoData={videoData} />;

    case "twitter.com":
    case "x.com":
      return <TwitterFormat videoData={videoData} />;

    case "reddit.com":
      return (
        <>
          <RedditFormat videoData={videoData} />
        </>
      );
    default:
      return null;
  }
};

export default DomainCheck;
