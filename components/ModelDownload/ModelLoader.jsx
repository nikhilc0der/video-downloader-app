import { View, Text, Modal } from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function ModelLoader() {
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={true}>
        <View
          className="w-full h-[25%] bg-[#e6e6e6] absolute bottom-0"
          style={{ padding: RFPercentage(2) }}
        >
          <Text className="text-center">Parsing Url</Text>
          <View className="justify-center items-center">
            <Text className="justify-center items-center">............</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}
