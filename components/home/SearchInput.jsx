import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  Platform,
  ToastAndroid,
  Alert,
} from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { CrossIcon, PasteIcon, SearchIcon } from "../../Icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Clipboard from "expo-clipboard";

export default function SearchInput({
  handleVideoSubmit,
  setInput,
  input,
  videoError,
  setVideoError,
  domain,
}) {
  const [pasteBtn, setPasteBtn] = useState(false);
  let arr = [
    "instagram.com",
    "tiktok.com",
    "twitter.com",
    "x.com",
    "dailymotion.com",
    "threads.net",
    "y2u.be",
    "youtu.be",
    "youtube.com",
    "vimeo.com",
    "player.vimeo.com",
    "fb.watch",
    "facebook.com",
    "in.pinterest.com",
    "pin.it",
    "reddit.com",
    "dai.ly",
  ];

  useEffect(() => {
    setTimeout(() => {
      setVideoError("");
    }, 3000);
  }, [videoError]);

  useEffect(() => {
    (async () => {
      let text = await Clipboard.getStringAsync();
      for (let i = 0; i < arr.length; i++) {
        if (!input && text.includes(arr[i])) {
          setPasteBtn(true);
        }
      }
    })();
  }, [input]);

  const handlerClipButton = async () => {
    const text = await Clipboard.getStringAsync();
    setInput(text);
    setPasteBtn(false);
  };

  return (
    <View
      className=""
      style={{
        paddingHorizontal: RFPercentage(2),
        paddingBottom: RFPercentage(2),
      }}
    >
      <View
        className="bg-[#f0f4f9] w-full rounded-2xl flex-row items-center"
        style={{
          marginTop: RFPercentage(2.5),
          marginBottom: RFPercentage(1.5),
          gap: RFPercentage(1),
          padding: RFPercentage(2),
          shadowColor: "black",
          shadowOpacity: 0.26,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 3,
          elevation: 3,
        }}
      >
        <TextInput
          style={{ fontSize: RFPercentage(2) }}
          value={input}
          onChangeText={setInput}
          numberOfLines={1}
          className="flex-1 font-semibold overflow-hidden"
          placeholder="Enter the URL..."
          placeholderTextColor={"#9ca3af"}
        />
        {pasteBtn && (
          <TouchableOpacity onPress={handlerClipButton}>
            <PasteIcon color="#ef473a" size={RFPercentage(3)} />
          </TouchableOpacity>
        )}
        {input && (
          <TouchableOpacity onPress={() => setInput("")}>
            <CrossIcon color={"#9ca3af"} size={RFPercentage(3)} />
          </TouchableOpacity>
        )}
        <TouchableOpacity
          className="items-center bg-[#ef473a]"
          style={{
            paddingHorizontal: RFPercentage(2),
            paddingVertical: RFPercentage(0.8),
            borderRadius: RFPercentage(100),
          }}
          onPress={handleVideoSubmit}
        >
          <SearchIcon color={"#fff"} size={RFPercentage(3)} />
        </TouchableOpacity>
      </View>

      {videoError
        ? Platform.OS === "android"
          ? ToastAndroid.show(videoError, ToastAndroid.LONG)
          : Alert.alert(videoError)
        : null}
    </View>
  );
}
