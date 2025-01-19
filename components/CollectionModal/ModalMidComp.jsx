import { View, Text, Platform, ToastAndroid, Alert } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import ModalTopBar from "./ModalTopBar";
import { HistoryIcon, PlusIcon } from "../../Icons";
import {
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { UpdateCollection } from "../../redux/CollectionHistory";
import NoHistory from "../Progress/NoHistory";

export default function ModalMidComp({ setCollection, videoData, domain }) {
  const { collectionItem } = useSelector((state) => state.collection);
  const dispatch = useDispatch();
  function dispatchHandlerArray(data, prevData, id, collectionName) {
    if (prevData) {
      dispatch(
        UpdateCollection({
          id: id,
          collectionName: collectionName,
          collectionArray: [...prevData, ...data],
        })
      );
      Platform.OS === "android"
        ? ToastAndroid.show(
            `Saved to ${collectionName} Collection`,
            ToastAndroid.LONG
          )
        : Alert.alert(`Saved to ${collectionName} Collection`);
    } else {
      dispatch(
        UpdateCollection({
          id: id,
          collectionName: collectionName,
          collectionArray: [...data],
        })
      );
      Platform.OS === "android"
        ? ToastAndroid.show(
            `Saved to ${collectionName} Collection`,
            ToastAndroid.LONG
          )
        : Alert.alert(`Saved to ${collectionName} Collection`);
    }
  }
  function dispatchHandler(link, thumbnail, prevData, id, collectionName) {
    if (prevData) {
      dispatch(
        UpdateCollection({
          id: id,
          collectionName: collectionName,
          collectionArray: [
            ...prevData,
            {
              newUrl: link,
              thumbnail: thumbnail,
            },
          ],
        })
      );
      Platform.OS === "android"
        ? ToastAndroid.show(
            `Saved to ${collectionName} Collection`,
            ToastAndroid.LONG
          )
        : Alert.alert(`Saved to ${collectionName} Collection`);
    } else {
      UpdateCollection({
        id: id,
        collectionName: collectionName,
        collectionArray: [
          {
            newUrl: link,
            thumbnail: thumbnail,
          },
        ],
      });
      Platform.OS === "android"
        ? ToastAndroid.show(
            `Saved to ${collectionName} Collection`,
            ToastAndroid.LONG
          )
        : Alert.alert(`Saved to ${collectionName} Collection`);
    }
  }

  const CollectionData = (id, collectionName, prevData, videoData, domain) => {
    if (domain == "tiktok.com") {
      dispatchHandler(
        videoData.videoNoWatermark.url,
        videoData.previewImageUrl,
        prevData,
        id,
        collectionName
      );
    } else if (domain == "threads.net") {
      videoData.media[0].type == "video"
        ? dispatchHandler(
            videoData.media[0].media[0].url,
            `${
              (videoData.media[0].thumbnail &&
                videoData.media[0].thumbnail[0].url) ||
              videoData.media[0].media[0].url
            }`,
            prevData,
            id,
            collectionName
          )
        : dispatchHandler(
            videoData.media[0].media[0].url,
            `${
              (videoData.media[0].thumbnail &&
                videoData.media[0].thumbnail[0].url) ||
              videoData.media[0].media[0].url
            }`,
            prevData,
            id,
            collectionName
          );
    } else if (domain == "instagram.com") {
      videoData[0] ? (
        dispatchHandlerArray(videoData, prevData, id, collectionName)
      ) : (
        <>
          {videoData.story ? (
            <>
              {videoData.video
                ? dispatchHandler(
                    videoData.video,
                    videoData.thumbnail,
                    prevData,
                    id,
                    collectionName
                  )
                : dispatchHandler(
                    videoData.thumbnail,
                    videoData.thumbnail,
                    prevData,
                    id,
                    collectionName
                  )}
            </>
          ) : (
            <>
              {videoData.newUrl.includes("d.rapidcdn.app") &&
                dispatchHandler(
                  videoData.newUrl,
                  videoData.thumbnail,
                  prevData,
                  id,
                  collectionName
                )}
              {videoData.newUrl.includes("jpg") &&
                dispatchHandler(
                  videoData.newUrl,
                  videoData.thumbnail,
                  prevData,
                  id,
                  collectionName
                )}
            </>
          )}
        </>
      );
    } else if (domain == "dailymotion.com" || domain == "dai.ly") {
      dispatchHandler(
        videoData.video[0].link,
        videoData.thumbnail,
        prevData,
        id,
        collectionName
      );
    } else if (domain == "vimeo.com" || domain == "player.vimeo.com") {
      videoData?.video?.length > 0
        ? dispatchHandler(
            videoData.video[1].url,
            videoData.thumbnail,
            prevData,
            id,
            collectionName
          )
        : Platform.OS === "android"
        ? ToastAndroid.show(
            "this file is not exists in your file manager",
            ToastAndroid.LONG
          )
        : Alert.alert("download link not found");
    } else if (domain == "facebook.com" || domain == "fb.watch") {
      let link = videoData.hd ? videoData.hd : videoData.newUrl;
      dispatchHandler(link, videoData.thumbnail, prevData, id, collectionName);
    } else if (domain == "in.pinterest.com" || domain == "pin.it") {
      if (videoData.video) {
        dispatchHandler(
          videoData.video,
          videoData.thumbnail,
          prevData,
          id,
          collectionName
        );
      } else {
        dispatchHandler(
          videoData.images.src,
          videoData.images.src,
          prevData,
          id,
          collectionName
        );
      }
    } else if (domain == "twitter.com" || domain == "x.com") {
      const imageUrl = videoData.media_extended[0]?.url;
      const isVideo = videoData.media_extended[0]?.type === "video";
      const isGif = videoData.media_extended[1]?.type === "gif";
      if (isVideo) {
        dispatchHandler(
          videoData.media_extended[0].url,
          videoData.media_extended[0].thumbnail_url,
          prevData,
          id,
          collectionName
        );
      } else if (!isVideo && !isGif && imageUrl) {
        dispatchHandler(
          videoData.mediaURLs[0],
          videoData.mediaURLs[0],
          prevData,
          id,
          collectionName
        );
      } else if (!isVideo && isGif) {
        dispatchHandler(
          videoData.mediaURLs[1],
          videoData.mediaURLs[0],
          prevData,
          id,
          collectionName
        );
      }
    } else if (domain == "reddit.com") {
      const audioUrl = videoData.audio;
      const videoUrl = videoData.media;
      let gifUrl;
      if (videoData.gif) {
        gifUrl = videoData.gif.replace(/amp;/g, "");
      }
      const url = `https://sd.rapidsave.com/download.php?permalink=https://www.reddit.com/${videoData.permalink}&video_url=${videoUrl}&audio_url=${audioUrl}`;
      let arr = [];
      if (videoData?.media_data?.length > 0) {
        videoData.media_data.map((id) =>
          Object.keys(id).map((item, index) =>
            arr.push({
              newUrl: `${id[item].s.u.replace(/amp;/g, "")}`,
              thumbnail: `${id[item].s.u.replace(/amp;/g, "")}`,
            })
          )
        );
      }

      {
        videoData?.media_data?.length > 0 ? (
          arr.length > 0 ? (
            dispatchHandlerArray(arr, prevData, id, collectionName)
          ) : (
            Alert.alert("not found data")
          )
        ) : (
          <>
            {videoData.video
              ? dispatchHandler(
                  url,
                  videoData.thumbnail,
                  prevData,
                  id,
                  collectionName
                )
              : videoData.gif
              ? dispatchHandler(
                  gifUrl,
                  videoData.thumbnail,
                  prevData,
                  id,
                  collectionName
                )
              : dispatchHandler(
                  videoData.thumbnail,
                  videoData.thumbnail,
                  prevData,
                  id,
                  collectionName
                )}
          </>
        );
      }
    }
  };

  return (
    <>
      <View
        style={{
          paddingHorizontal: RFPercentage(3),
        }}
      >
        <View
          className="justify-between items-center flex-row"
          style={{ paddingVertical: RFPercentage(3) }}
        >
          <Text className="font-bold" style={{ fontSize: RFPercentage(2) }}>
            Collections
          </Text>
          <TouchableOpacity onPress={() => setCollection(true)}>
            <Text
              className="text-[#ef473a]"
              style={{ fontSize: RFPercentage(1.7) }}
            >
              New collections
            </Text>
          </TouchableOpacity>
        </View>
        {collectionItem.length > 0 ? (
          <>
            <FlatList
              data={collectionItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                rowGap: RFPercentage(0.5),
                padding: RFPercentage(0.5),
              }}
              renderItem={({ item, index }) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => {
                    CollectionData(
                      item.id,
                      item.collectionName,
                      item.collectionArray,
                      videoData,
                      domain
                    );
                  }}
                >
                  <View style={{ paddingVertical: RFPercentage(1) }}>
                    <ModalTopBar
                      thumbnail={
                        item.collectionArray.length > 0 &&
                        item.collectionArray.flat(1).at(-1).thumbnail
                      }
                      text={item.collectionName}
                      icon={
                        <PlusIcon size={RFPercentage(3)} color={"#121212"} />
                      }
                      border={true}
                    />
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          </>
        ) : (
          <NoHistory
            text={"You Haven't Created Any Collection Yet"}
            icon={<HistoryIcon size={RFPercentage(3)} color={"#bdbdbd"} />}
          />
        )}
      </View>
    </>
  );
}
