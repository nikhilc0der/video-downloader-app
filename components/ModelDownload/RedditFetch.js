export const fetchRedditData = (video, setVideoData) => {
  const url = video.replace(/\?[a-zA-Z_=&0-9]+/g, "").split("?")[0];
  fetch(`${url}.json`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data === "Request Failed With Code 401") {
        setVideoData("private");
      } else {
        function findKeysInNestedData(data, targetKey, results = []) {
          if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
              findKeysInNestedData(data[i], targetKey, results);
            }
          } else if (typeof data === "object") {
            for (let key in data) {
              if (key === targetKey) {
                results.push(data[key]);
              } else {
                findKeysInNestedData(data[key], targetKey, results);
              }
            }
          }
          return results;
        }
        const mainData = data[0].data.children[0].data;
        const text = findKeysInNestedData(mainData, "_text");
        const title = findKeysInNestedData(mainData, "title");
        const video = findKeysInNestedData(mainData, "is_video");
        const thumb = findKeysInNestedData(mainData, "source");
        const gif = findKeysInNestedData(mainData, "mp4");
        const Url = findKeysInNestedData(mainData, "fallback_url");
        const audio = Url.length
          ? Url[0].replace(/DASH_[a-zA-Z0-9.?=]+/g, "DASH_AUDIO_128.mp4")
          : null;
        const thumbnail = thumb.length
          ? thumb[0].url.replace(/amp;/g, "")
          : null;
        const imageThum = findKeysInNestedData(mainData, "thumbnail");
        const subreddit = findKeysInNestedData(mainData, "subreddit");
        const id = mainData.id;
        const permalink = findKeysInNestedData(mainData, "permalink");
        const media_data = findKeysInNestedData(mainData, "media_metadata");
        const media = Url.length ? Url[0] : null;
        setVideoData({
          title: title.length ? title[0] : null,
          text: text.length ? text[0] : null,
          video: video.length ? video[0] : null,
          subreddit: subreddit ? subreddit[0] : null,
          imageThum: imageThum ? imageThum[0] : null,
          thumbnail: thumbnail,
          permalink: permalink[0],
          audio: audio,
          id: id,
          gif: gif.length ? gif[0].source.url : null,
          media: media,
          media_data: media_data ? media_data : null,
        });
      }
    })
    .catch((error) => {
      console.error(`Error fetching ${video} video data:`, error);
      if (error instanceof Error && error.message.includes("500")) {
        setVideoData("noVideo");
      }
    });
};
