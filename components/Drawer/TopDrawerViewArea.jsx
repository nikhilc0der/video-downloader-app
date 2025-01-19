import React, { useState } from "react";
import { Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { ThreedotIcon } from "../../Icons";
import { useSelector } from "react-redux";
import TabArea from "./TabArea";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Menu, MenuItem } from "react-native-material-menu";
function TopDrawerViewArea({ navigation }) {
  const tabsArr = useSelector((state) => state.addtabs);
  const [visible, setVisible] = useState(false);

  const hideMenu = (item) => {
    setVisible(false);
    if (item === "Close current tab") {
    } else if (item === "Close other tabs") {
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
    <>
      <View>
        <View
          style={{
            paddingHorizontal: RFPercentage(2),
            paddingVertical: RFPercentage(1),
          }}
          className="bg-[#cbd5e1] flex-row justify-between items-center"
        >
          <Text
            className="font-bold text-[#121212]"
            style={{
              paddingVertical: RFPercentage(1.5),
              fontSize: RFPercentage(2.5),
            }}
          >
            Tabs
          </Text>
          {/* <Menu
            visible={visible}
            anchor={
              <TouchableOpacity onPress={showMenu}>
                <ThreedotIcon color={"#121212"} size={RFPercentage(3)} />
              </TouchableOpacity>
            }
            onRequestClose={Handler}
            style={{ marginTop: RFPercentage(4), width: RFPercentage(25) }}
          >
            {["Close current tab", "Close other tabs"].map((item, index) => (
              <MenuItem onPress={() => hideMenu(item)} key={index}>
                <View className="flex-row justify-between items-center">
                  <Text className="text-black">{item}</Text>
                </View>
              </MenuItem>
            ))}
          </Menu> */}
        </View>

        {tabsArr.map((item, index) => (
          <TabArea
            key={index}
            navigation={navigation}
            item={item}
            index={index}
          />
        ))}
      </View>
    </>
  );
}

export default TopDrawerViewArea;
