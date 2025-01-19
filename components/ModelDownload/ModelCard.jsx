import { Modal } from "react-native";
import ImageModelCard from "./ImageModelCard";
import downloadFunc from "../videos/downloadFunc";
import { useNavigation } from "@react-navigation/native";

export default function ModelCard({ urlImage, setUrlImage }) {
  const navigation = useNavigation();
  const { downloadFile } = downloadFunc();
  function onClose(id) {
    if (id == "image") {
      setUrlImage("");
    }
  }
  const downloaderHandler = async (link, thumbnail, fileType, format) => {
    try {
      await downloadFile(link, thumbnail, fileType);
      onClose(format);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {urlImage && (
        <Modal animationType="slide" transparent={true} visible={true}>
          <ImageModelCard
            urlImage={urlImage}
            downloaderHandler={downloaderHandler}
            onClose={onClose}
            setUrlImage={setUrlImage}
          />
        </Modal>
      )}
    </>
  );
}
