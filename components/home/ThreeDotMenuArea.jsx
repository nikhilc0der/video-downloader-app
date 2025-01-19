import React, { useState } from "react";
import { View, Text, Platform } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Menu, MenuItem } from "react-native-material-menu";
import { RFPercentage } from "react-native-responsive-fontsize";
import menubar from "../../constants/Menubar";
import { ThreedotIcon } from "../../Icons";
import { addtab } from "../../redux/CreateTabSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function ThreeDotMenuArea() {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const tabb = useSelector((state) => state.addtabs);
  const lastTabNumber = tabb.length;
  const hideMenu = (item) => {
    setVisible(false);
    if (item.heading === "New Tab") {
      const addTabHandlerParent = async () => {
        try {
          await dispatch(
            addtab({
              icon: "Earth",
              label: "HomePage",
              color: "#fff",
              link: "homescreen",
            })
          );
          navigation.navigate(`tab-${lastTabNumber}`);
        } catch (err) {
          console.warn(err);
        }
      };
      addTabHandlerParent();
    } else if (item.heading === "Share") {
    } else if (item.heading === "History") {
      navigation.navigate("Downloads");
    } else if (item.heading === "Copy Link") {
    } else if (item.heading === "Bookmark") {
    } else if (item.heading === "Share with friends") {
    } else if (item.heading === "Settings") {
      navigation.navigate("Settings");
    } else {
      setVisible(false);
    }
  };

  const showMenu = () => {
    setVisible(true);
  };
  const Handler = () => {
    setVisible(false);
  };

  return (
    <Menu
      animationDuration={400}
      visible={visible}
      anchor={
        <TouchableOpacity onPress={showMenu}>
          <ThreedotIcon color={"#ffffff"} size={RFPercentage(3)} />
        </TouchableOpacity>
      }
      onRequestClose={Handler}
      style={{ marginTop: RFPercentage(4), width: RFPercentage(25) }}
    >
      <FlatList
        data={menubar}
        renderItem={({ item, index }) => (
          <MenuItem onPress={() => hideMenu(item)} key={index}>
            <View
              className="flex-row justify-between items-center"
              style={{ paddingLeft: RFPercentage(2) }}
            >
              <View style={{ marginRight: RFPercentage(1) }}>{item.icon}</View>
              <Text>{item.heading}</Text>
            </View>
          </MenuItem>
        )}
      />
    </Menu>
  );
}
