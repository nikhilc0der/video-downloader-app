import { Text, View } from "react-native";
import { FaqIcon, HomeIcon, SettingIcon } from "../../Icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import ThreeDotMenuArea from "./ThreeDotMenuArea";
function Navbar() {
  const navigation = useNavigation();
  const tabs = useSelector((state) => state.addtabs);
  return (
    <>
      <View className="justify-start items-center flex-row">
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <View
            className="border-[#ffffff]"
            style={{
              borderWidth: RFPercentage(0.2),
              borderColor: "#fff",
              borderRadius: RFPercentage(1),
            }}
          >
            <Text
              className="justify-center items-center text-white"
              style={{
                paddingHorizontal: RFPercentage(1),
                paddingVertical: RFPercentage(0.5),
              }}
            >
              {tabs.length}
            </Text>
          </View>
        </TouchableOpacity>
        <Text className="text-[0px]">
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeScreen")}
            style={{ marginLeft: RFPercentage(2) }}
          >
            <HomeIcon color={"#ffffff"} size={RFPercentage(3)} />
          </TouchableOpacity>
        </Text>
      </View>

      <View className="flex-row justify-between items-center w-[15%]">
        <TouchableOpacity onPress={() => navigation.navigate("Slider")}>
          <FaqIcon color={"#ffffff"} size={RFPercentage(3)} />
        </TouchableOpacity>
        <ThreeDotMenuArea />
      </View>
    </>
  );
}

export default Navbar;
