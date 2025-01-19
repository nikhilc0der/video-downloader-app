import React, { useState } from "react";
import { CrossIcon, ThreedotIcon } from "../../Icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  Alert,
  FlatList,
  Platform,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";

function DownloadScreenTopBar({
  setMultiDelete,
  isMultiDelete,
  allDelete,
  setAllDelete,
  FinishLength,
}) {
  const MultiDeleteHandler = () => {
    setMultiDelete(!isMultiDelete);
  };

  const [visible, setVisible] = useState(false);
  const showMenu = () => {
    if (isMultiDelete) {
      MultiDeleteHandler(!isMultiDelete);
      setVisible(false);
    } else {
      setVisible(true);
    }
  };
  const Handler = () => {
    setVisible(false);
  };

  const hideMenu = (item) => {
    setVisible(false);
    if (item === "All Delete") {
      setAllDelete(!allDelete);
    } else if (item === "Select") {
      setMultiDelete(true);
      MultiDeleteHandler();
    }
  };

  return (
    <>
      <Text
        className="justify-center items-center font-bold text-white"
        style={{
          fontSize: RFPercentage(3),
        }}
      >
        Downloads
      </Text>

      <Menu
        animationDuration={400}
        visible={visible}
        anchor={
          <TouchableOpacity onPress={showMenu}>
            <View
              className="rounded-full bg-white"
              style={{ padding: RFPercentage(0.5) }}
            >
              <View
                className="rounded-full bg-[#121212]"
                style={{ padding: RFPercentage(0.6) }}
              >
                {isMultiDelete ? (
                  <CrossIcon size={RFPercentage(2)} color={"#ffffff"} />
                ) : (
                  <ThreedotIcon color={"#fff"} size={RFPercentage(2)} />
                )}
              </View>
            </View>
          </TouchableOpacity>
        }
        onRequestClose={Handler}
        style={{ marginTop: RFPercentage(4) }}
      >
        <FlatList
          data={["All Delete", "Select"]}
          renderItem={({ item, index }) => {
            return FinishLength.length > 0 ? (
              <MenuItem onPress={() => hideMenu(item)} key={index}>
                <View
                  className="flex-row justify-between items-center"
                  style={{ padding: RFPercentage(1) }}
                >
                  <Text>{item}</Text>
                </View>
              </MenuItem>
            ) : Platform.OS === "android" ? (
              ToastAndroid.show(`History is empty`, ToastAndroid.LONG)
            ) : (
              Alert.alert(`History is empty`)
            );
          }}
        />
      </Menu>
    </>
  );
}

export default DownloadScreenTopBar;
