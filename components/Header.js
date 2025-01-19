import { View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { RFPercentage } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Header = ({ children }) => {
  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={["#cb2d3e", "#ef473a"]}
        style={{
          width: "100%",
          zIndex: 100,
        }}
      >
        <SafeAreaView edges={["top"]}>
          <View
            style={{
              paddingTop: RFPercentage(4),
              paddingBottom: RFPercentage(2),
              paddingHorizontal: RFPercentage(2),
            }}
            className="flex-row items-center justify-between"
          >
            {children}
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

export default Header;
