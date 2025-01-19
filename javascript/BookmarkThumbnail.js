function BookmarkThumbnail(videoData, domain) {
  switch (domain) {
    case "tiktok.com": {
      return imageFunc(videoData.previewImageUrl);
    }
    case "threads.net": {
      let threadsThumbnail;
      if (videoData.media[0].thumbnail) {
        threadsThumbnail = videoData.media[0].thumbnail[0].url;
      } else {
        threadsThumbnail = videoData.media[0].media[0].url;
      }
      return imageFunc(threadsThumbnail);
    }
    case "instagram.com": {
      let instagramThumbnail;
      if (Array.isArray(videoData)) {
        instagramThumbnail = videoData[0].thumbnail;
      } else {
        instagramThumbnail = videoData.thumbnail;
      }
      return imageFunc(instagramThumbnail);
    }

    case "dailymotion.com":
    case "dai.ly": {
      return imageFunc(videoData.thumbnail);
    }

    case "vimeo.com":
    case "player.vimeo.com": {
      return imageFunc(videoData.video.length > 0 && videoData.thumbnail);
    }

    case "fb.watch":
    case "facebook.com": {
      return imageFunc(videoData.thumbnail);
    }

    case "in.pinterest.com":
    case "pin.it": {
      let pinterestThumbnail;
      if (videoData.videos) {
        pinterestThumbnail = videoData.thumbnail;
      } else {
        pinterestThumbnail = videoData.images.src;
      }

      return imageFunc(pinterestThumbnail);
    }

    case "twitter.com":
    case "x.com": {
      let twitterThumbnail;
      if (videoData.media_extended[0].thumbnail_url) {
        twitterThumbnail = videoData.media_extended[0].thumbnail_url;
      } else {
        twitterThumbnail = videoData.mediaURLs[0];
      }
      return imageFunc(twitterThumbnail);
    }

    case "reddit.com": {
      let redditThumbnail;
      if (videoData?.media_data?.length > 0) {
        videoData.media_data.map((id) =>
          Object.keys(id).map(
            (item) => (redditThumbnail = `${id[item].s.u.replace(/amp;/g, "")}`)
          )
        );
      } else {
        redditThumbnail = videoData.thumbnail;
      }
      return imageFunc(redditThumbnail);
    }

    default:
      return null;
  }
}

export default BookmarkThumbnail;

function imageFunc(image) {
  return image;
}
