import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { Menu, MenuItem } from "react-native-material-menu";
import { RFPercentage } from "react-native-responsive-fontsize";
import { BackArrow, ThreedotIcon } from "../../Icons";

function GalleryScreenTopBar({
  setDelete,
  collectionName,
  setRename,
  goBackHandler,
}) {
  const [visible, setVisible] = useState(false);
  const showMenu = () => {
    setVisible(true);
  };
  const Handler = () => {
    setVisible(false);
  };

  const hideMenu = (item) => {
    setVisible(false);
    if (item === "Rename Collection") {
      setRename(true);
    } else if (item === "Delete All") {
      setDelete(true);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={goBackHandler}>
        <View
          className="rounded-full bg-white"
          style={{ padding: RFPercentage(0.5) }}
        >
          <BackArrow color={"#121212"} size={RFPercentage(3)} />
        </View>
      </TouchableWithoutFeedback>

      <Text
        className="justify-center items-center font-bold text-white"
        style={{
          fontSize: RFPercentage(3),
        }}
      >
        {collectionName}
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
              <ThreedotIcon color={"#121212"} size={RFPercentage(3)} />
            </View>
          </TouchableOpacity>
        }
        onRequestClose={Handler}
        style={{ marginTop: RFPercentage(4) }}
      >
        <FlatList
          data={["Rename Collection", "Delete All"]}
          renderItem={({ item, index }) => (
            <MenuItem onPress={() => hideMenu(item)} key={index}>
              <View
                className="flex-row justify-between items-center"
                style={{ padding: RFPercentage(1) }}
              >
                <Text>{item}</Text>
              </View>
            </MenuItem>
          )}
        />
      </Menu>
    </>
  );
}

export default GalleryScreenTopBar;
