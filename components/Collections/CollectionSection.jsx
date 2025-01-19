import { View, Text, Image } from "react-native";
import React from "react";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import NoHistory from "../Progress/NoHistory";
import { HistoryIcon } from "../../Icons";

export default function CollectionSection({ collectionItem, navigation }) {
  return (
    <View className="flex-1">
      {collectionItem.length > 0 ? (
        <FlatList
          data={collectionItem}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={{
            rowGap: RFPercentage(0.5),
            padding: RFPercentage(0.5),
          }}
          columnWrapperStyle={{ gap: RFPercentage(0.5) }}
          renderItem={({ item }) => (
            <View className="w-[50%]" key={item.id}>
              <TouchableWithoutFeedback
                style={{
                  paddingVertical: RFPercentage(1),
                  paddingHorizontal: RFPercentage(2),
                }}
                onPress={() =>
                  navigation.navigate("GalleryScreen", {
                    element:
                      item.collectionArray.length > 0 && item.collectionArray,
                    collectionName: item.collectionName,
                    id: item.id,
                  })
                }
              >
                <View
                  className="overflow-hidden"
                  style={{
                    borderRadius: RFPercentage(1),
                    height: RFPercentage(20),
                    shadowColor: "black",
                    shadowOpacity: 0.4,
                    shadowOffset: { width: 0, height: 0 },
                    shadowRadius: 5,
                    elevation: 6,
                  }}
                >
                  <Image
                    source={{
                      uri: `${
                        item.collectionArray.length > 0 &&
                        item.collectionArray.flat(1).at(-1).thumbnail
                      }`,
                    }}
                    defaultSource={require("../../assets/ImageLoader.png")}
                    className="w-full h-full bg-white"
                    resizeMode="contain"
                  />
                </View>
                <Text
                  className="text-black text-start"
                  style={{ paddingVertical: RFPercentage(1) }}
                >
                  {item.collectionName} ({item.collectionArray.length})
                </Text>
              </TouchableWithoutFeedback>
            </View>
          )}
        />
      ) : (
        <NoHistory
          text={"You Haven't Created Any Collection Yet"}
          icon={<HistoryIcon size={RFPercentage(3)} color={"#bdbdbd"} />}
        />
      )}
    </View>
  );
}
