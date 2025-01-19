import { Alert, LogBox, Platform, ToastAndroid } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import MainSearchScreen from "../components/SearchArea/MainSearchScreen";
import TopBar from "../components/SearchArea/TopBar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ModalComp from "../components/CollectionModal/ModalComp";
import CollectionForm from "../components/CollectionModal/CollectionForm";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import GalleryDownloadModal from "../components/Gallery/GalleryDownloadModal";

export default function SearchScreen(props) {
  LogBox.ignoreAllLogs();
  const { videoData, domain, setPreLoading, setInput, setVideoData } =
    props.route.params;
  console.log(videoData, "videoData");
  const modalRef = useRef(null);
  const openModal = () => {
    if (typeof videoData == "string") {
      Platform.OS === "android"
        ? ToastAndroid.show(
            "Please select a video to add to the collection.",
            ToastAndroid.LONG
          )
        : Alert.alert("Please select a video to add to the collection.");
    } else {
      modalRef?.current?.open();
    }
  };
  const [isCollection, setCollection] = useState(false);
  const downloadprogress = useSelector((state) => state.addprogress);
  const ProgressLength = useMemo(
    () => downloadprogress.filter((item) => item.Progress < 1),
    [downloadprogress]
  );

  return (
    <>
      <GestureHandlerRootView className="flex-1">
        <Header>
          <TopBar
            setPreLoading={setPreLoading}
            setInput={setInput}
            setVideoData={setVideoData}
            openModal={openModal}
          />
        </Header>
        <MainSearchScreen domain={domain} videoData={videoData} />
        <ModalComp
          modalRef={modalRef}
          setCollection={setCollection}
          videoData={videoData}
          domain={domain}
        />
      </GestureHandlerRootView>
      {ProgressLength.map((item, index) => (
        <GalleryDownloadModal
          key={index}
          progressModal={ProgressLength.length > 0 ? true : false}
          Isprogress={item.Progress}
        />
      ))}

      <CollectionForm
        domain={domain}
        isCollection={isCollection}
        setCollection={setCollection}
        videoData={videoData}
      />
    </>
  );
}
