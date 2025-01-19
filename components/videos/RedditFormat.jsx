import React from "react";
import DownloadButton from "../Custom/DownloadButton";
import RedditMultiFormat from "./RedditMultiFormat";

function RedditFormat({ videoData }) {
  const audioUrl = videoData.audio;
  const videoUrl = videoData.media;
  let gifUrl;
  if (videoData.gif) {
    gifUrl = videoData.gif.replace(/amp;/g, "");
  }
  const url = `https://sd.rapidsave.com/download.php?permalink=https://www.reddit.com/${videoData.permalink}&video_url=${videoUrl}&audio_url=${audioUrl}`;

  return (
    <>
      {videoData?.media_data?.length > 0 ? (
        <>
          <RedditMultiFormat videoData={videoData} />
        </>
      ) : (
        <>
          {videoData.video ? (
            <DownloadButton
              url={url}
              thumbnail={videoData.thumbnail}
              filetype={"mp4"}
              heading={"Video"}
            />
          ) : videoData.gif ? (
            <DownloadButton
              url={gifUrl}
              thumbnail={videoData.thumbnail}
              filetype={"mp4"}
              heading={"Gif"}
            />
          ) : (
            <>
              <DownloadButton
                url={videoData.thumbnail}
                thumbnail={videoData.thumbnail}
                filetype={"jpg"}
                heading={"Image"}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default RedditFormat;
