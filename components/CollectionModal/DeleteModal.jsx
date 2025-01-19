import { View, Text, Modal, TouchableWithoutFeedback } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useDispatch } from "react-redux";
import { removeFromCollection } from "../../redux/CollectionHistory";
import {
  MultiDeleteHistory,
  allDeleteHistory,
  removeFromHistory,
} from "../../redux/CreateHistory";

const DeleteModal = ({
  isDelete,
  setDelete,
  id,
  goBackHandler,
  videolink,
  DownloadData,
  files,
  setMultiDelete,
  allDelete,
}) => {
  const dispatch = useDispatch();
  const DeleteHandler = () => {
    if (videolink) {
      dispatch(
        removeFromHistory({
          videolink: videolink,
        })
      );
      setDelete(false);
    } else if (allDelete) {
      dispatch(allDeleteHistory([]));
    } else if (DownloadData) {
      dispatch(MultiDeleteHistory(DownloadData));
      setDelete(!isDelete);
      setMultiDelete(false);
    } else if (id) {
      dispatch(
        removeFromCollection({
          id: id,
        })
      );
      goBackHandler();
    }
  };
  return (
    <>
      {!videolink && (
        <View
          className={`absolute top-0 w-full h-[100vh] opacity-50 bg-black ${
            isDelete ? "flex-col" : "hidden"
          }`}
          style={{ zIndex: 101 }}
        ></View>
      )}
      <View style={{ zIndex: 110 }}>
        <Modal visible={isDelete} animationType="fade" transparent={true}>
          <View className="w-full h-full justify-center items-center">
            <View
              className="bg-gray-200 rounded-2xl"
              style={{ width: RFPercentage(40) }}
            >
              <View
                className="border-gray-300"
                style={{
                  padding: RFPercentage(3),
                  borderBottomWidth: RFPercentage(0.1),
                }}
              >
                <Text
                  className="text-gray-800 text-center font-bold"
                  style={{
                    marginTop: RFPercentage(0.5),
                    fontSize: RFPercentage(2),
                  }}
                >
                  {`Are You Sure You Want To Delete ${
                    videolink
                      ? "File"
                      : files
                      ? "Files"
                      : allDelete
                      ? "All Files"
                      : "Collection"
                  } ?`}
                </Text>
              </View>
              <View className="flex-row">
                <TouchableWithoutFeedback onPress={() => setDelete(false)}>
                  <View
                    className="w-1/2 border-gray-300"
                    style={{
                      padding: RFPercentage(2),
                      borderRightWidth: RFPercentage(0.1),
                    }}
                  >
                    <Text
                      className="text-center font-extrabold text-sky-700"
                      style={{ fontSize: RFPercentage(2) }}
                    >
                      Cancel
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={DeleteHandler}>
                  <View className="w-1/2" style={{ padding: RFPercentage(2) }}>
                    <Text
                      className="text-center font-extrabold"
                      style={{
                        fontSize: RFPercentage(2),
                        color: "red",
                      }}
                    >
                      Delete
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default DeleteModal;
