import React from "react";
import DownloadButton from "../Custom/DownloadButton";

const TwitterFormat = ({ videoData }) => {
  const imageUrl = videoData.media_extended[0]?.url;
  const isVideo = videoData.media_extended[0]?.type === "video";
  const isGif = videoData.media_extended[1]?.type === "gif";

  return (
    <>
      {isVideo && (
        <DownloadButton
          url={videoData.media_extended[0].url}
          thumbnail={videoData.media_extended[0].thumbnail_url}
          filetype={"mp4"}
          heading={"Video"}
        />
      )}

      {!isVideo && !isGif && imageUrl && (
        <DownloadButton
          url={videoData.mediaURLs[0]}
          thumbnail={videoData.mediaURLs[0]}
          filetype={"jpg"}
          heading={"Image"}
        />
      )}
      {!isVideo && isGif && (
        <DownloadButton
          url={videoData.mediaURLs[1]}
          thumbnail={videoData.mediaURLs[0]}
          filetype={"mp4"}
          heading={"Gif"}
        />
      )}
    </>
  );
};

export default TwitterFormat;
