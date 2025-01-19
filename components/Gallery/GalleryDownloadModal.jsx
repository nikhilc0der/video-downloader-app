import { View, Text, Modal } from "react-native";
import React from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import * as Progress from "react-native-progress";

export default function GalleryDownloadModal({ progressModal, Isprogress }) {
  return (
    <>
      <View
        className={`absolute top-0 w-full h-full opacity-50 bg-black z-20 ${
          progressModal ? "flex-col" : "hidden"
        }`}
      ></View>
      <View className="z-50">
        <Modal visible={progressModal} animationType="slide" transparent={true}>
          <View className="w-full h-full justify-center items-center">
            <View
              className="bg-white rounded-2xl items-center"
              style={{ padding: RFPercentage(4) }}
            >
              <Text
                className="font-semibold"
                style={{
                  marginBottom: RFPercentage(2),
                  fontSize: RFPercentage(1.7),
                }}
              >
                Downloading...
              </Text>
              <Progress.Bar
                progress={Isprogress}
                height={RFPercentage(0.5)}
                borderColor="#ef473a"
                color="#ef473a"
                borderRadius={0}
                width={RFPercentage(20)}
              />
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
