import { useNavigation } from "@react-navigation/native";
import { Image, Text, View } from "react-native";
import Slick from "react-native-slick";
import { CrossIcon } from "../../Icons";
import { RFPercentage } from "react-native-responsive-fontsize";
import { TouchableOpacity } from "react-native-gesture-handler";

function SliderComp() {
  const navigation = useNavigation();
  return (
    <>
      <Slick showsButtons={false}>
        <View className="flex-1 justify-center items-center ">
          <Image
            source={require("../../assets/howto.png")}
            defaultSource={require("../../assets/ImageLoader.png")}
            className="w-full h-full"
          />
        </View>
        <View className="flex-1 justify-center items-center bg-green-500">
          <Text className="font-bold text-[#000]">Beautiful</Text>
        </View>
        <View className="flex-1 justify-center items-center bg-orange-500">
          <Text className="font-bold text-[#000]">And simple</Text>
        </View>
      </Slick>
    </>
  );
}

export default SliderComp;
