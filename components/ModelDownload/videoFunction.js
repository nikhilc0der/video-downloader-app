import { fetchRedditData } from "./RedditFetch";
const videoFunction = (setVideoData) => {
  const fetchVideoData = (source, video) => {
    if (source === "reddit") {
      fetchRedditData(video, setVideoData);
    } else {
      fetch(`https://aiovideodownloader.com/api/${source}?url=${video}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data === "Request Failed With Code 401") {
            setVideoData("This file is private or requires authentication.");
          } else if (
            Array.isArray(data.mediaURLs) &&
            data.mediaURLs.length === 0
          ) {
            setVideoData("URL");
          } else if (data.length === 0) {
            setVideoData("Private and no data found");
          } else {
            setVideoData(data);
          }
        })
        //  vimeo else if (data.video.length == 0) {
        //   setVideoData("The download link is not found.");
        // }
        .catch((error) => {
          console.error(`Error fetching ${source} video data:`, error);
          if (error instanceof Error && error.message.includes("500")) {
            setVideoData("No Video Found");
          }
        });
    }
  };
  const youtubeVideo = (video) => {
    video.includes("playlist?list")
      ? fetchVideoData("getYoutubePlaylist", video)
      : video.includes("live")
      ? fetchVideoData("youtube", video.replace("live/", "watch?v="))
      : fetchVideoData("youtube", video);
  };
  const spotifyAudio = (video) => fetchVideoData("getSpotifyDetails", video);
  const soundcloudAudio = (video) => fetchVideoData("soundcloud", video);
  const instaVideo = (video) => fetchVideoData("instagram", video);
  const tiktokVideo = (video) => fetchVideoData("tiktok", video);
  const twitterVideo = (video) => fetchVideoData("twitter", video);
  const facebookVideo = (video) => fetchVideoData("facebook", video);
  const vimeoVideo = (video) => fetchVideoData("vimeo", video);
  const redditVideo = (video) => fetchVideoData("reddit", video);
  const threadsVideo = (video) => fetchVideoData("threads", video);
  const pinterestData = (video) => fetchVideoData("pinterest", video);
  const dailymotionVideo = (video) => fetchVideoData("dailymotion", video);
  return {
    dailymotionVideo,
    pinterestData,
    soundcloudAudio,
    facebookVideo,
    twitterVideo,
    youtubeVideo,
    spotifyAudio,
    threadsVideo,
    tiktokVideo,
    redditVideo,
    instaVideo,
    vimeoVideo,
  };
};
export default videoFunction;
