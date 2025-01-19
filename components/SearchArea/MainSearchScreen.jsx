import React from "react";
import ShowVideoData from "./ShowVideoData";
import { ScrollView } from "react-native-gesture-handler";

export default function MainSearchScreen({ videoData, domain }) {
  return (
    <>
      <ScrollView>
        <ShowVideoData domain={domain} videoData={videoData} />
      </ScrollView>
    </>
  );
}
