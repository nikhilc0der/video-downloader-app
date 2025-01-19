import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import { BackArrow } from "../Icons";

export default function WhatsAppScreen(props) {
  const navigation = useNavigation();
  const { files } = props.route.params;

  function goVideoScreen(videolink) {
    navigation.navigate("VideoScreen", {
      videolink: videolink,
      title: videolink,
      download: true,
    });
  }

  function goBackHandler() {
    navigation.goBack();
    return true;
  }

  return (
    <>
      <Header>
        <View className="flex-row justify-between items-center">
          <TouchableWithoutFeedback
            onPress={goBackHandler}
            style={{ marginRight: RFPercentage(2) }}
          >
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
            Whatsapp Status
          </Text>
        </View>
      </Header>
      <FlatList
        data={files}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={{
          rowGap: RFPercentage(0.5),
          padding: RFPercentage(0.5),
        }}
        columnWrapperStyle={{ gap: RFPercentage(0.5) }}
        renderItem={({ item, index }) => {
          if (!item.includes("nomedia")) {
            return (
              <View
                key={index}
                className="flex-1 bg-white"
                style={{ height: RFPercentage(18) }}
              >
                <TouchableOpacity
                  style={{ padding: RFPercentage(1) }}
                  onPress={() => goVideoScreen(item)}
                >
                  <View className="">
                    <Image
                      source={{ uri: item }}
                      defaultSource={require("../assets/ImageLoader.png")}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
    </>
  );
}
