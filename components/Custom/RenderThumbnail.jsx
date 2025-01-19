import React from "react";
import TitleComp from "./TitleComp";
import { Image, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import PreviewComp from "./PreviewComp";

const RenderThumbnail = ({ thumbnail, title, condition }) => {
  return (
    <>
      {condition ? (
        <></>
      ) : (
        <>
          {thumbnail && (
            <>
              <PreviewComp />
              <View
                className="rounded-2xl bg-white overflow-hidden relative"
                style={{
                  height: RFPercentage(30),
                  shadowColor: "black",
                  shadowOpacity: 0.26,
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 5,
                  elevation: 6,
                }}
              >
                <Image
                  source={{
                    uri: thumbnail,
                  }}
                  defaultSource={require("../../assets/ImageLoader.png")}
                  className="w-full h-full bg-white"
                  resizeMode="contain"
                />
              </View>
              {title && <TitleComp title={title} />}
            </>
          )}
        </>
      )}
    </>
  );
};
export default RenderThumbnail;
