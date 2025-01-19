import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  Platform,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  CheckBoxIcon,
  DeleteIcon,
  ResumeIcon,
  ShareIcon,
  SquareIcon,
} from "../../Icons";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { useDispatch } from "react-redux";
import { removeFromHistory } from "../../redux/CreateHistory";
import { shareAsync } from "expo-sharing";
import DeleteModal from "../CollectionModal/DeleteModal";
export default function CompleteDownload({
  FinishLength,
  isMultiDelete,
  setMultiDelete,
  allDelete,
  setAllDelete,
}) {
  const [DownloadData, setDownloadData] = useState(FinishLength.reverse());
  const [ConfirmModal, setConfirmModal] = useState(false);
  useEffect(() => {
    setDownloadData(FinishLength.reverse());
  }, [FinishLength]);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  async function goVideoScreen(videolink, title) {
    await checkIfFileExists(videolink).then((exists) => {
      if (exists) {
        navigation.navigate("VideoScreen", {
          videolink: videolink,
          title: title,
        });
      } else {
        dispatch(removeFromHistory({ videolink }));
        Platform.OS === "android"
          ? ToastAndroid.show(
              "this file is not exists in your file manager",
              ToastAndroid.LONG
            )
          : Alert.alert("this file is not exists in your file manager");
      }
    });
  }
  const checkIfFileExists = async (fileUri) => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      return fileInfo;
    } catch (error) {
      console.error("Error checking file existence:", error);
      return false;
    }
  };

  const onShare = async (link) => {
    shareAsync(link);
  };

  function Thumbnail(item) {
    return (
      <View
        className="bg-white overflow-hidden relative w-[100%]"
        style={{
          height: RFPercentage(10),
        }}
      >
        <Image
          source={{
            uri: item.Thumbnail,
          }}
          defaultSource={require("../../assets/ImageLoader.png")}
          className="w-full h-full bg-white"
          resizeMode="contain"
        />
      </View>
    );
  }
  const [isDelete, setDelete] = useState("");
  const goBackHandler = () => {
    navigation.goBack();
    return true;
  };

  const handleChange = (id) => {
    let temp = DownloadData.map((item) => {
      if (id == item.fileId) {
        return { ...item, status: !item.status };
      }
      return item;
    });
    setDownloadData(temp);
  };

  const deleteHandler = () => {
    setConfirmModal(!ConfirmModal);
  };

  return (
    <>
      <View
        className={`absolute top-0 w-full h-full opacity-50 bg-black ${
          isDelete ? "flex-col" : "hidden"
        }`}
        style={{ zIndex: 101 }}
      ></View>

      <DeleteModal
        isDelete={allDelete}
        setDelete={setAllDelete}
        allDelete={true}
      />

      <DeleteModal
        isDelete={ConfirmModal}
        setDelete={setConfirmModal}
        DownloadData={DownloadData}
        goBackHandler={goBackHandler}
        files={true}
        setMultiDelete={setMultiDelete}
      />

      <View
        className={`absolute ${isMultiDelete ? "flex-col" : "hidden"}`}
        style={{
          zIndex: 102,
          bottom: RFPercentage(3),
          right: RFPercentage(3),
        }}
      >
        <TouchableOpacity onPress={deleteHandler}>
          <View
            className="rounded-full bg-[#121212] w-full"
            style={{ padding: RFPercentage(0.5) }}
          >
            <View
              className="rounded-full bg-[#fff] w-full"
              style={{ padding: RFPercentage(1) }}
            >
              <DeleteIcon size={RFPercentage(3)} color={"#121212"} />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {DownloadData.length > 0 && (
        <FlatList
          data={DownloadData}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            rowGap: RFPercentage(0.5),
            padding: RFPercentage(0.5),
          }}
          renderItem={({ item, index }) => {
            return (
              <>
                <DeleteModal
                  isDelete={isDelete.length > 0 ? true : false}
                  setDelete={setDelete}
                  videolink={isDelete}
                  goBackHandler={goBackHandler}
                />
                {isMultiDelete && (
                  <View
                    className="absolute h-full w-full "
                    style={{ zIndex: 200 }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        handleChange(item.fileId);
                      }}
                      className={`w-full h-full justify-start ${
                        !item.status ? "" : "bg-black opacity-60"
                      }`}
                    >
                      {!item.status ? (
                        <SquareIcon color={"#ef473a"} size={RFPercentage(4)} />
                      ) : (
                        <CheckBoxIcon
                          color={"#ef473a"}
                          size={RFPercentage(4)}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                )}
                <View
                  className="bg-slate-200 flex-row items-center justify-between w-[100%] relative"
                  style={{
                    zIndex: 50,
                    padding: RFPercentage(1),
                    borderRadius: RFPercentage(1),
                    marginBottom: RFPercentage(0.3),
                  }}
                  key={index}
                >
                  <View className="w-[30%]">
                    {Thumbnail(item)}
                    <View className="absolute top-0 bg-black opacity-60 z-20 w-[100%]">
                      <TouchableOpacity
                        style={{
                          height: RFPercentage(10),
                        }}
                        onPress={() => goVideoScreen(item.dirs, item.Title)}
                        className="justify-center items-center"
                      >
                        <ResumeIcon size={RFPercentage(3)} color={"#fff"} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View className="w-[68%]">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-black w-[70%]">{item.Title}</Text>
                      <TouchableOpacity onPress={() => onShare(item.shareUri)}>
                        <ShareIcon size={RFPercentage(3)} color={"#121212"} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setDelete(item.dirs)}>
                        <DeleteIcon size={RFPercentage(3)} color={"#121212"} />
                      </TouchableOpacity>
                    </View>
                    <View className="flex-row justify-between items-center">
                      <Text>{item.TotalSize}</Text>
                      <Text className="text-black">{item.time}</Text>
                    </View>
                  </View>
                </View>
              </>
            );
          }}
        />
      )}
    </>
  );
}
