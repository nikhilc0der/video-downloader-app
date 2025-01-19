import React, { useEffect } from "react";
import { BackHandler, Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { HomeIcon, LeftArrowIcon, PlusIcon, RightArrowIcon } from "../../Icons";
import { GiftIcon } from "../../Icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { addtab } from "../../redux/CreateTabSlice";
function BottomTabs({ navigation }) {
  const dispatch = useDispatch();
  const tabb = useSelector((state) => state.addtabs);
  const lastTabNumber = tabb.length;
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

  return (
    <>
      <View>
        {/* <View
          style={{
            paddingHorizontal: RFPercentage(2),
            paddingVertical: RFPercentage(2),
          }}
          className="flex-row justify-start items-center border-t-[1px] border-[#bdbdbd]"
        >
          <GiftIcon color={"#ef473a"} size={RFPercentage(3)} />
          <Text className="font-medium pl-[12px]">Favorite sites</Text>
        </View> */}
        <View
          style={{
            paddingHorizontal: RFPercentage(2),
            paddingVertical: RFPercentage(2),
          }}
          className="bg-[#cbd5e1] flex-row justify-between items-center"
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HomeScreen");
            }}
          >
            <LeftArrowIcon color={"#121212"} size={RFPercentage(3)} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("HomeScreen");
            }}
          >
            <HomeIcon color={"#121212"} size={RFPercentage(3)} />
          </TouchableOpacity>
          <RightArrowIcon color={"#121212"} size={RFPercentage(3)} />
          <TouchableOpacity onPress={addTabHandlerParent}>
            <PlusIcon color={"#121212"} size={RFPercentage(3)} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

export default BottomTabs;
