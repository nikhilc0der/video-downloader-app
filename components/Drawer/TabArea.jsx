import { View, Text } from "react-native";
import { CrossIcon } from "../../Icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { deletetab } from "../../redux/CreateTabSlice";
import IconController from "./IconController";
import { linkStore } from "../../redux/CreateLinkSave";
function TabArea({ index, navigation, item }) {
  const dispatch = useDispatch();
  const currentDrawerScreenIndex = navigation.getState().index;
  const tabb = useSelector((state) => state.addtabs);
  const lastTabNumber = tabb.length;
  function CrossHandle(index) {
    if (lastTabNumber == 1) {
      navigation.closeDrawer();
    } else {
      dispatch(deletetab(index));
      const nextIndex = index - 1 === -1 ? index + 1 : index - 1;
      const nextUrl = tabb[nextIndex].link;
      index = nextIndex;
      navigation.getState().index = nextIndex;
      dispatch(linkStore(nextUrl));
      navigation.navigate(`tab-${index}`);
    }
  }

  function changeTab() {
    navigation.navigate(`tab-${index}`);
    dispatch(linkStore(tabb[index].link));
  }
  return (
    <TouchableOpacity onPress={changeTab}>
      <View
        style={{
          paddingHorizontal: RFPercentage(2),
          paddingVertical: RFPercentage(1),
        }}
        className={`flex-row justify-between items-center ${
          index === currentDrawerScreenIndex && "bg-[#cbd5e1]"
        } `}
      >
        <View className="flex-row justify-between items-center">
          <View
            className="rounded-full justify-center items-center m-auto text-white font-extrabold"
            style={{
              width: RFPercentage(4.5),
              height: RFPercentage(4.5),
              backgroundColor: item.color,
              fontSize: RFPercentage(4.5),
            }}
          >
            <IconController IconName={item.icon} />
          </View>

          <Text className="font-bold pl-[12px] text-[#121212]">
            {item.label}
          </Text>
        </View>
        <TouchableOpacity onPress={() => CrossHandle(index)}>
          <CrossIcon color={"#121212"} size={RFPercentage(3)} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default TabArea;
