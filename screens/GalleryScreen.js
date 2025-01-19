import React, { useEffect, useMemo, useState } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { BackHandler, Modal, Text, TouchableOpacity, View } from "react-native";
import Header from "../components/Header";
import GestureRecognizer from "react-native-swipe-gestures";
import { useNavigation } from "@react-navigation/native";
import downloadFunc from "../components/videos/downloadFunc";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import GallerySection from "../components/Gallery/GallerySection";
import GalleryDownloadModal from "../components/Gallery/GalleryDownloadModal";
import GalleryScreenTopBar from "../components/Gallery/GalleryScreenTopBar";
import DeleteModal from "../components/CollectionModal/DeleteModal";
import GalleryFormModal from "../components/Gallery/GalleryFormModal";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFiles } from "../redux/CollectionHistory";
import NoHistory from "../components/Progress/NoHistory";
import { HistoryIcon } from "../Icons";

export default function GalleryScreen(props) {
  const { downloadFile } = downloadFunc();
  const { element, collectionName, id } = props.route.params;
  const [collectionGalleryOptionsModal, setCollectionGalleryOptionsModal] =
    useState(false);
  const [progressModal, setProgressModal] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let fileTypeCheck =
    collectionGalleryOptionsModal &&
    collectionGalleryOptionsModal.newUrl.includes("jpg");
  let filetype = fileTypeCheck == true ? "jpg" : "mp4";

  const downloadprogress = useSelector((state) => state.addprogress);
  const ProgressLength = useMemo(
    () => downloadprogress.filter((item) => item.Progress < 1),
    [downloadprogress]
  );

  let arr = [
    {
      text: "Download",
      color: "#15803d",
      function: () => {
        downloadFile(
          collectionGalleryOptionsModal.newUrl,
          collectionGalleryOptionsModal.thumbnail,
          filetype
        );
        setCollectionGalleryOptionsModal(false);
      },
    },
    {
      text: "Share",
      color: "#be185d",
      function: () => {
        Share(collectionGalleryOptionsModal.newUrl, filetype);
        setCollectionGalleryOptionsModal(false);
      },
    },
    {
      text: "Preview",
      color: "#0369a1",
      function: () => {
        navigation.navigate("VideoScreen", {
          videolink: collectionGalleryOptionsModal.newUrl,
          title: filetype,
        });
        setCollectionGalleryOptionsModal(false);
      },
    },
    {
      text: "Delete",
      color: "#ef473a",
      function: () => {
        dispatch(
          removeFromFiles({
            id: id,
            newUrl: collectionGalleryOptionsModal.newUrl,
          })
        );
        goBackHandler();
      },
    },
    {
      text: "Cancel",
      color: "#121212",
      function: () => setCollectionGalleryOptionsModal(false),
    },
  ];

  const [Isprogress, setProgress] = useState(0);
  const callback = (downloadProgress) => {
    setProgress(
      downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite
    );
  };

  const Share = async (link, fileType) => {
    setProgressModal(true);
    let number = new Date().getTime();
    const downloadResumable = FileSystem.createDownloadResumable(
      link,
      FileSystem.documentDirectory +
        `videodownloaderbest.com_${number}.${fileType}`,
      {},
      callback
    );
    try {
      const { uri } = await downloadResumable.downloadAsync();
      shareAsync(uri);
      setProgressModal(false);
    } catch (e) {
      console.error(e);
    }
  };

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
  const [isRename, setRename] = useState(false);
  const [isDelete, setDelete] = useState(false);

  return (
    <>
      <Header>
        <GalleryScreenTopBar
          collectionName={collectionName}
          setRename={setRename}
          goBackHandler={goBackHandler}
          setDelete={setDelete}
        />
      </Header>

      {ProgressLength.map((item, index) => (
        <GalleryDownloadModal
          key={index}
          progressModal={ProgressLength.length > 0 ? true : false}
          Isprogress={item.Progress}
        />
      ))}

      <DeleteModal
        isDelete={isDelete}
        setDelete={setDelete}
        id={id}
        goBackHandler={goBackHandler}
      />

      <GalleryFormModal
        isRename={isRename}
        collectionName={collectionName}
        id={id}
        setRename={setRename}
        element={element}
        goBackHandler={goBackHandler}
      />

      {collectionGalleryOptionsModal && (
        <View className="z-50">
          <GestureRecognizer
            style={{ flex: 1 }}
            onSwipeDown={() => setCollectionGalleryOptionsModal(false)}
          >
            <Modal animationType="slide" transparent={true} visible={true}>
              <Modal visible={true} transparent={true} animationType="slide">
                <View className="absolute bottom-0 rounded-t-2xl bg-slate-200 w-full">
                  {arr.map((item, index) => (
                    <TouchableOpacity key={index} onPress={item.function}>
                      <View
                        className="border-gray-300"
                        style={{
                          padding: RFPercentage(3),
                          borderBottomWidth: RFPercentage(0.1),
                        }}
                      >
                        <Text
                          className="text-center font-bold"
                          style={{
                            fontSize: RFPercentage(2),
                            color: item.color,
                          }}
                        >
                          {item.text}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </Modal>
            </Modal>
          </GestureRecognizer>
        </View>
      )}
      <GalleryDownloadModal
        progressModal={progressModal}
        Isprogress={Isprogress}
      />
      {element.length > 0 ? (
        <GallerySection
          element={element}
          setCollectionGalleryOptionsModal={setCollectionGalleryOptionsModal}
        />
      ) : (
        <NoHistory
          text={"You Haven't Saved Yet"}
          icon={<HistoryIcon size={RFPercentage(3)} color={"#bdbdbd"} />}
        />
      )}
    </>
  );
}
