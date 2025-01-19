import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system";
import { useDispatch } from "react-redux";
import {
  UpdateProgress,
  downloadProgress,
} from "../../redux/CreateDownloadProgress";
import { Platform } from "react-native";
import { shareAsync } from "expo-sharing";
import { useNavigation } from "@react-navigation/native";
import { addToHistory } from "../../redux/CreateHistory";

const { StorageAccessFramework } = FileSystem;

const downloadFunc = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isProgress, setProgress] = useState(0);
  const [totalBytes, setTotalBytes] = useState("");
  const [currentBytes, setCurrentBytes] = useState("");
  const [islink, setLink] = useState("");
  const [fileId, setfileId] = useState("");
  const [isThumbnail, setThumbnail] = useState("");
  const [isTitle, setTitle] = useState("");
  const [Time, setTime] = useState("");
  const [dirs, setDirs] = useState("");
  const [ShareURI, setShareURI] = useState("");
  function generateUniqueIdFromUrl(url) {
    let hash = 0;
    if (url.length === 0) return hash.toString();
    for (let i = 0; i < url.length; i++) {
      const char = url.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return hash.toString();
  }

  const callback = (downloadProgress) => {
    setProgress(
      downloadProgress.totalBytesWritten /
        downloadProgress.totalBytesExpectedToWrite
    );
    {
      let currBytes = downloadProgress.totalBytesWritten;
      const sizeInKB = currBytes / 1024;
      const sizeInMB = sizeInKB / 1024;
      if (sizeInMB < 1) {
        setCurrentBytes(`${sizeInKB.toFixed(2)} KB`);
      } else {
        setCurrentBytes(`${sizeInMB.toFixed(2)} MB`);
      }
    }
    {
      let totalSize = downloadProgress.totalBytesExpectedToWrite;
      const sizeKB = totalSize / 1024;
      const sizeMB = sizeKB / 1024;
      if (sizeMB < 1) {
        setTotalBytes(`${sizeKB.toFixed(2)} KB`);
      } else {
        setTotalBytes(`${sizeMB.toFixed(2)} MB`);
      }
    }
  };

  const download = async (link, thumbnail, fileType, titleheading) => {
    console.log(link, "Link");
    console.log(thumbnail, "Thumb");
    console.log(fileType, "File Type");
    let number = new Date().getTime();
    let filepath = fileType === "jpg" ? "image/jpg" : "video/mp4";
    setLink(link);
    setThumbnail(thumbnail);
    let date = new Date().getDate();
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    setTime(date + "-" + month + "-" + year);
    setTitle(titleheading || `videodownloaderbest.com_${number}.${fileType}`);
    const id = generateUniqueIdFromUrl(
      `videodownloaderbest.com_${number}.${fileType}`
    );
    if (id) {
      setfileId(id);
    }
    (function handler() {
      if (id) {
        dispatch(
          downloadProgress({
            fileId: id,
            Thumbnail: thumbnail,
            Title: isTitle,
            Progress: isProgress,
            TotalSize: totalBytes,
            CurrentSize: currentBytes,
            islink: islink,
            time: date + "-" + month + "-" + year,
            dirs: dirs,
          })
        );
      }
    })();

    const downloadResumable = FileSystem.createDownloadResumable(
      link,
      FileSystem.documentDirectory +
        `videodownloaderbest.com_${number}.${fileType}`,
      {},
      callback
    );
    if (Platform.OS == "android") {
      try {
        const { uri } = await downloadResumable.downloadAsync();
        setShareURI(uri);
        try {
          const fileString = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          const directoryToSave = await AsyncStorage.getItem("setnikhil");
          if (directoryToSave) {
            try {
              await StorageAccessFramework.createFileAsync(
                directoryToSave,
                `videodownloaderbest.com_${number}.${fileType}`,
                filepath
              )
                .then(async (uri) => {
                  setDirs(uri);
                  await FileSystem.writeAsStringAsync(uri, fileString, {
                    encoding: FileSystem.EncodingType.Base64,
                  });
                })
                .catch((e) => {
                  console.error(e);
                });
            } catch (e) {
              throw new Error(e);
            }
          } else {
            const permissions =
              await StorageAccessFramework.requestDirectoryPermissionsAsync();
            if (!permissions.granted) {
              return;
            } else {
              await AsyncStorage.setItem("setnikhil", permissions.directoryUri);
              try {
                await StorageAccessFramework.createFileAsync(
                  permissions.directoryUri,
                  `videodownloaderbest.com_${number}.${fileType}`,
                  filepath
                )
                  .then(async (uri) => {
                    setDirs(uri);
                    await FileSystem.writeAsStringAsync(uri, fileString, {
                      encoding: FileSystem.EncodingType.Base64,
                    });
                  })
                  .catch((e) => {
                    console.error(e);
                  });
              } catch (e) {
                throw new Error(e);
              }
            }
          }
        } catch (err) {
          console.error(err);
        }
      } catch (e) {
        console.error(e);
      }
    } else {
      const { uri } = await downloadResumable.downloadAsync();
      shareAsync(uri);
    }
  };

  useEffect(() => {
    if (fileId) {
      dispatch(
        UpdateProgress({
          fileId: fileId,
          Thumbnail: isThumbnail,
          Title: isTitle,
          Progress: isProgress,
          TotalSize: totalBytes,
          CurrentSize: currentBytes,
          islink: islink,
          time: Time,
          dirs: dirs,
        })
      );
    }
  }, [isProgress]);

  useEffect(() => {
    if (dirs) {
      dispatch(
        addToHistory({
          fileId: fileId,
          Thumbnail: isThumbnail,
          Title: isTitle,
          Progress: isProgress,
          TotalSize: totalBytes,
          CurrentSize: currentBytes,
          islink: islink,
          time: Time,
          dirs: dirs,
          shareUri: ShareURI,
          status: false,
        })
      );
      navigation.navigate("Downloads");
    }
  }, [dirs.length > 0]);

  const downloadFile = (link, thumbnail, fileType, titleheading) =>
    download(link, thumbnail, fileType, titleheading);
  return {
    downloadFile,
  };
};

export default downloadFunc;
