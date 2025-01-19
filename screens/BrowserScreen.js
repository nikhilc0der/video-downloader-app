import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import Navbar from "../components/home/Navbar";
import jsCode from "../javascript/CreatedownloadIcon";
import ModalArea from "../components/ModelDownload/ModalArea";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";

export default function BrowserScreen() {
  const linkarea = useSelector((state) => state.addlink);
  const [url, setInput] = useState("");
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
      <Header>
        <Navbar />
      </Header>
      <WebView
        source={{ uri: linkarea.link }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        injectedJavaScript={jsCode}
        domStorageEnabled={true}
        onMessage={(event) => {
          const message = JSON.parse(event.nativeEvent.data);
          if (message.type == "console") {
            if (message.data[0] == "video") {
              setInput(message.data[1]);
            } else if (message.data[0] == "image") {
              setInput(message.data[1]);
            }
          }
        }}
      />
      {url && <ModalArea input={url} setInput={setInput} />}
    </>
  );
}
