import React from "react";
import DownloadButton from "../Custom/DownloadButton";

export default function PinterestFormat({ videoData }) {
  const imgUrl = videoData.images.src
    .replace("236x", "736x")
    .replace("474x", "736x");

  return (
    <>
      {videoData.videos ? (
        <DownloadButton
          url={videoData.video}
          thumbnail={videoData.thumbnail}
          filetype={"mp4"}
          heading={"Video"}
        />
      ) : (
        <DownloadButton
          url={imgUrl}
          thumbnail={videoData.images.src}
          filetype={"jpg"}
          heading={"Image"}
        />
      )}
    </>
  );
}
