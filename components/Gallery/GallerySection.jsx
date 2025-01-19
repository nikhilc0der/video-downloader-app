import { View, Image } from "react-native";
import React from "react";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function GallerySection({
  element,
  setCollectionGalleryOptionsModal,
}) {
  return (
    <>
      {element.length > 0 && (
        <FlatList
          data={element.flat(1)}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            rowGap: RFPercentage(0.5),
            padding: RFPercentage(0.5),
          }}
          columnWrapperStyle={{ gap: RFPercentage(0.5) }}
          renderItem={({ item, index }) => (
            <>
              <View
                className="flex-1 bg-white"
                style={{ height: RFPercentage(18) }}
                key={index}
              >
                <TouchableWithoutFeedback
                  onPress={() => setCollectionGalleryOptionsModal(item)}
                >
                  <View className="relative">
                    <Image
                      source={{ uri: item.thumbnail }}
                      defaultSource={require("../../assets/ImageLoader.png")}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </>
          )}
        />
      )}
    </>
  );
}
