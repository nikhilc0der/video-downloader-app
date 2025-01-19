import React from "react";
import BrowserComp from "../components/Setting/BrowserComp";
import Header from "../components/Header";
import { Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

export default function SettingScreen() {
  return (
    <>
      <Header>
        <Text
          className="justify-center items-center font-bold text-white"
          style={{
            fontSize: RFPercentage(3),
          }}
        >
          Setting
        </Text>
      </Header>
      <BrowserComp />
    </>
  );
}
