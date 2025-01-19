import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MP4 from "./MP4";
import { RFPercentage } from "react-native-responsive-fontsize";
import downloadFunc from "./downloadFunc";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";

const YouTubeFormat = ({
  showOptions,
  videoData,
  showMore,
  toggleShowMore,
  title,
}) => {
  const maxOptionsToShow = 1;
  const optionsToShow = showMore
    ? videoData.formats.length
    : Math.min(videoData.formats.length, maxOptionsToShow);

  const { downloadFile } = downloadFunc();
  const navigation = useNavigation();

  function downloadHandler(url, filetype) {
    downloadFile(url, videoData.thumbnail, filetype, title);
  }

  return (
    <>
      {showOptions && (
        <View>
          {videoData.formats.map(
            (
              {
                qualityLabel,
                container,
                url,
                hasVideo,
                hasAudio,
                audioBitrate,
              },
              index
            ) => {
              if (container === "mp4" && hasAudio && hasVideo) {
                return (
                  <TouchableOpacity
                    onPress={() => downloadHandler(url, "mp4")}
                    key={index}
                  >
                    <MP4
                      container={container}
                      qualityLabel={qualityLabel}
                      hasAudio={hasAudio}
                      audioBitrate={audioBitrate}
                      index={index}
                    />
                  </TouchableOpacity>
                );
              }
            }
          )}
          {videoData.formats.map(
            ({ qualityLabel, url, hasAudio, codecs, audioBitrate }, index) => {
              if (codecs === "opus" && hasAudio) {
                return (
                  <TouchableOpacity
                    onPress={() => downloadHandler(url, "weba")}
                    key={index}
                  >
                    <MP4
                      container={"Audio opus"}
                      qualityLabel={qualityLabel}
                      hasAudio={hasAudio}
                      audioBitrate={audioBitrate}
                      index={index}
                      codecs={codecs}
                    />
                  </TouchableOpacity>
                );
              }
            }
          )}
          {videoData.formats
            .slice(0, optionsToShow)
            .map(
              (
                {
                  qualityLabel,
                  container,
                  url,
                  hasVideo,
                  hasAudio,
                  codecs,
                  audioBitrate,
                },
                index
              ) => {
                if (container === "webm" && hasVideo) {
                  return (
                    <TouchableOpacity
                      onPress={() => downloadHandler(url, "webm")}
                      style={{ width: "100%" }}
                      key={index}
                    >
                      <MP4
                        container={container}
                        qualityLabel={qualityLabel}
                        hasAudio={hasAudio}
                        audioBitrate={audioBitrate}
                        index={index}
                        codecs={codecs}
                      />
                    </TouchableOpacity>
                  );
                }
              }
            )}
          {videoData.formats
            .slice(0, optionsToShow)
            .map(
              (
                {
                  qualityLabel,
                  container,
                  url,
                  hasVideo,
                  hasAudio,
                  codecs,
                  audioBitrate,
                },
                index
              ) => {
                if (container === "mp4" && hasVideo && !hasAudio) {
                  return (
                    <TouchableOpacity
                      onPress={() => downloadHandler(url, "mp4")}
                      style={{ width: "100%" }}
                      key={index}
                    >
                      <MP4
                        container={container}
                        qualityLabel={qualityLabel}
                        hasAudio={hasAudio}
                        audioBitrate={audioBitrate}
                        index={index}
                        codecs={codecs}
                      />
                    </TouchableOpacity>
                  );
                }
              }
            )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              backgroundColor: "#ef473a",
              padding: RFPercentage(1),
              width: RFPercentage(45),
            }}
            className="mx-auto"
          >
            <TouchableOpacity
              onPress={toggleShowMore}
              style={{ padding: RFPercentage(2) }}
            >
              <Text
                style={{
                  color: "white",
                }}
              >
                {showMore ? "Show Less" : "Show More"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default YouTubeFormat;

// if (item.container === "webm" && item.hasVideo) {
//   return (
//     <TouchableOpacity
//       onPress={() => downloadHandler(item.url, "webm")}
//       style={{ width: "100%" }}
//       key={index}
//     >
//       <MP4
//         container={item.container}
//         qualityLabel={item.qualityLabel}
//         hasAudio={item.hasAudio}
//         audioBitrate={item.audioBitrate}
//         index={index}
//         codecs={item.codecs}
//       />
//     </TouchableOpacity>
//   );
// }
// if (item.container === "mp4" && item.hasVideo && !item.hasAudio) {
//   return (
//     <TouchableOpacity
//       onPress={() => downloadHandler(item.url, "mp4")}
//       style={{ width: "100%" }}
//       key={index}
//     >
//       <MP4
//         container={item.container}
//         qualityLabel={item.qualityLabel}
//         hasAudio={item.hasAudio}
//         audioBitrate={item.audioBitrate}
//         index={index}
//         codecs={item.codecs}
//       />
//     </TouchableOpacity>
//   );
// }
