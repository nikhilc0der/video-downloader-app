import React from "react";
import DownloadButton from "../Custom/DownloadButton";
const ThreadsFormat = ({ videoData }) => {
  return (
    <>
      {videoData.media[0].type == "video" ? (
        <DownloadButton
          url={videoData.media[0].media.url}
          thumbnail={videoData.media[0].thumbnail[0].url}
          filetype={"mp4"}
          heading={"Video"}
        />
      ) : (
        <>
          <DownloadButton
            url={videoData.media[0].media[0].url}
            thumbnail={videoData.media[0].media[0].url}
            filetype={"jpg"}
            heading={"Image"}
          />
        </>
      )}
    </>
  );
};

export default ThreadsFormat;
