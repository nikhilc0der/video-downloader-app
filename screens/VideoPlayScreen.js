import {
  Alert,
  BackHandler,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Video } from "expo-av";
import { Image } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";
export default function VideoPlayScreen(props) {
  const { videolink, title, download } = props.route.params;
  let fileTypeCheck = title.includes("jpg");
  let filetype = fileTypeCheck == true ? "jpg" : "mp4";
  const [alertComp, setAlertComp] = useState(false);

  async function saveFile(filePath) {
    let path = filetype == "jpg" ? "image/jpg" : "video/mp4";
    const fileString = await FileSystem.readAsStringAsync(filePath, {
      encoding: FileSystem.EncodingType.Base64,
    });
    let number = new Date().getTime();
    try {
      await FileSystem.StorageAccessFramework.createFileAsync(
        "content://com.android.externalstorage.documents/tree/primary%3AAlarms",
        `videodownloaderbest.com_${number}.${filetype}`,
        path
      )
        .then(async (filePath) => {
          await FileSystem.writeAsStringAsync(filePath, fileString, {
            encoding: FileSystem.EncodingType.Base64,
          });
          setAlertComp(true);
          setTimeout(() => {
            setAlertComp(false);
          }, 2000);
        })
        .catch((e) => {
          console.error(e);
        });
    } catch (e) {
      throw new Error(e);
    }
  }

  const navigation = useNavigation();
  function goBackHandler() {
    navigation.goBack();
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", goBackHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", goBackHandler);
    };
  }, []);

  return (
    <>
      {alertComp &&
        (Platform.OS === "android"
          ? ToastAndroid.show(`Saved to Gallery...`, ToastAndroid.LONG)
          : Alert.alert(`Saved to Gallery...`))}
      {/* <View className="bg-black h-[100%] w-[100%] absolute bottom-0 top-0 right-0 left-0 opacity-80 z-50 flex justify-center items-center">
          <View className="w-[40%] h-[5%] bg-black absolute z-50 flex justify-center items-center">
            <Text className="text-white">Saved to Gallery...</Text>
          </View>
        </View> */}
      <View className="bg-black h-[100%]">
        {(fileTypeCheck && (
          <>
            <Image
              source={{
                uri: `${videolink}`,
              }}
              resizeMode="contain"
              className="w-[100%] h-[100%]"
            />
            {download && (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: RFPercentage(15),
                  right: RFPercentage(7),
                }}
                onPress={() => saveFile(videolink)}
              >
                <Image
                  source={require("../assets/downloadicon.jpeg")}
                  className="m-auto rounded-full"
                  style={{
                    width: RFPercentage(5),
                    height: RFPercentage(5),
                  }}
                />
              </TouchableOpacity>
            )}
          </>
        )) || (
          <>
            <Video
              source={{ uri: videolink }}
              useNativeControls={true}
              resizeMode="contain"
              shouldPlay={true}
              isLooping={true}
              className="w-[100%] h-[100%]"
            />
            {download && (
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: RFPercentage(15),
                  right: RFPercentage(7),
                }}
                onPress={() => saveFile(videolink)}
              >
                <Image
                  source={require("../assets/downloadicon.jpeg")}
                  className="m-auto rounded-full"
                  style={{
                    width: RFPercentage(5),
                    height: RFPercentage(5),
                  }}
                />
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </>
  );
}
