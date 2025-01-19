import React from "react";
import { Text, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { MessageIcon } from "../../Icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

function Feedback() {
  const navigation = useNavigation();
  return (
    <>
      <View className="flex-1 justify-center">
        <TouchableOpacity
          onPress={() => navigation.navigate("Feedback")}
          className="justify-center items-center flex-row"
        >
          <View style={{ marginRight: RFPercentage(1) }}>
            <MessageIcon color={"#121212"} size={RFPercentage(3)} />
          </View>
          <Text className="text-center underline">
            Got feedback or questions? Tell us
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Feedback;
