import { View } from "react-native";
import React from "react";
import { Modalize } from "react-native-modalize";
import ModalTopBar from "./ModalTopBar";
import ModalMidComp from "./ModalMidComp";
import { RFPercentage } from "react-native-responsive-fontsize";
import { BookmarkIcon } from "../../Icons";

export default function ModalComp({
  modalRef,
  setCollection,
  videoData,
  domain,
}) {
  const closeModal = () => modalRef?.current?.close();
  return (
    <>
      <Modalize
        ref={modalRef}
        snapPoint={300}
        modalTopOffset={80}
        closeSnapPointStraightEnabled={false}
        scrollViewProps={{ showsVerticalScrollIndicator: false }}
      >
        <View className="bg-slate-400 rounded-t-xl">
          <View style={{ padding: RFPercentage(3) }}>
            <ModalTopBar
              text={"Saved"}
              icon={<BookmarkIcon size={RFPercentage(2)} color={"#fff"} />}
              closeModal={closeModal}
              videoData={videoData}
              domain={domain}
            />
          </View>
        </View>
        <ModalMidComp
          setCollection={setCollection}
          videoData={videoData}
          domain={domain}
        />
      </Modalize>
    </>
  );
}
