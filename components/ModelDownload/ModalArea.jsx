import React, { useEffect, useState } from "react";
import videoFunction from "./videoFunction";
import ModelCard from "./ModelCard";
import { ActivityIndicator, Modal, Platform, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";

function ModalArea({ input, setInput, urlImage, setUrlImage }) {
  const [videoError, setVideoError] = useState("");
  const [domain, setDomain] = useState("");
  const [videoData, setVideoData] = useState("");
  const [preLoading, setPreLoading] = useState(false);
  const navigation = useNavigation();

  const {
    youtubeVideo,
    instaVideo,
    tiktokVideo,
    twitterVideo,
    facebookVideo,
    vimeoVideo,
    threadsVideo,
    redditVideo,
    dailymotionVideo,
    pinterestData,
  } = videoFunction(setVideoData);

  const domains = {
    // YouTube
    "youtube.com": {
      filter: ["watch?v", "shorts", "vi", "live", "playlist"],
      func: youtubeVideo,
    },

    "youtu.be": { filter: ["", "playlist"], func: youtubeVideo },
    "y2u.be": {
      filter: ["watch?v", "shorts", "", "playlist"],
      func: youtubeVideo,
    },

    // Instagram
    "instagram.com": {
      filter: ["reel", "p", "reels", "stories"],
      func: instaVideo,
    },

    // Facebook
    "facebook.com": {
      filter: ["videos", "", "share", "posts", "watch", "reel", "stories"],
      func: facebookVideo,
    },
    "fb.watch": {
      filter: ["videos", "share", "", "posts", "watch", "reel", "stories"],
      func: facebookVideo,
    },

    // Threads
    "threads.net": { filter: ["post"], func: threadsVideo },

    // Twitter
    "x.com": { filter: ["status"], func: twitterVideo },
    "twitter.com": { filter: ["status"], func: twitterVideo },

    // Dailymotion
    "dailymotion.com": {
      filter: ["video", "dailymotion"],
      func: dailymotionVideo,
    },
    "dai.ly": { filter: [""], func: dailymotionVideo },

    // Vimeo
    "vimeo.com": { filter: [""], func: vimeoVideo },
    "player.vimeo.com": { filter: ["video"], func: vimeoVideo },

    // Reddit
    "reddit.com": { filter: ["r"], func: redditVideo },

    //Pinterest
    "in.pinterest.com": {
      filter: ["pin", "save", "pin/"],
      func: pinterestData,
    },
    "pin.it": { filter: ["pin", "save", "pin/"], func: pinterestData },

    // TikTok
    "tiktok.com": { filter: ["video"], func: tiktokVideo },
  };

  useEffect(() => {
    const handleVideoSubmit = async () => {
      if (input) {
        const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([^\/\n]+)/;
        const match = input.match(domainRegex);
        checkurl(match);
      } else {
        setVideoError("Search Field is Required");
      }
    };
    handleVideoSubmit();
  }, [input]);

  async function checkurl(match) {
    if (match && Object.keys(domains).includes(match[1])) {
      if (
        domains[match[1]].filter.filter((string) => {
          return input.includes(string);
        })
      ) {
        try {
          await domains[match[1]].func(input);
          setDomain(match[1]);
          setPreLoading(true);
        } catch (error) {
          setVideoError("Error fetching video data. Please try again.");
        }
      } else {
        setVideoError("Please Enter The Valid Url");
      }
    } else {
      setVideoError("Please Enter The Valid Url");
    }
  }

  useEffect(() => {
    if (videoData) {
      setPreLoading(false);
      navigation.navigate("Search", {
        videoData: videoData,
        domain: domain,
        setPreLoading: setPreLoading,
        setInput: setInput,
        setVideoData: setVideoData,
      });
    }
  }, [videoData]);

  return (
    <>
      <View
        className={`absolute top-0 w-full h-full opacity-50 bg-black z-20 ${
          preLoading ? "flex-col" : "hidden"
        }`}
      ></View>
      <View className="z-50">
        <Modal visible={preLoading} animationType="slide" transparent={true}>
          <View className="w-full h-full justify-center items-center">
            <View
              className="bg-white rounded-2xl items-center"
              style={{ padding: RFPercentage(4) }}
            >
              <Text
                className="font-semibold"
                style={{
                  marginBottom: RFPercentage(2),
                  fontSize: RFPercentage(1.7),
                }}
              >
                Searching...
              </Text>
              <ActivityIndicator size="large" color="#ef473a" />
            </View>
          </View>
        </Modal>
      </View>
      <ModelCard urlImage={urlImage} setUrlImage={setUrlImage} />
    </>
  );
}

export default ModalArea;
