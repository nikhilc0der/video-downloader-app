import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { CheckBoxIcon, SquareIcon } from "../../Icons";

export default function FormComp() {
  const [checked, setChecked] = useState("");
  function checkedHandle(item) {
    if (item.id === checked) return setChecked("");
    setChecked(item.id);
  }
  let arr = [
    { id: 1, heading: "Can't browser videos" },
    { id: 2, heading: "No download resources detected" },
    { id: 3, heading: "Too many ads" },
    { id: 4, heading: "Others" },
  ];
  return (
    <View className="">
      <View
        className="bg-white"
        style={{
          paddingHorizontal: RFPercentage(2),
          paddingVertical: RFPercentage(2),
          marginBottom: RFPercentage(1),
        }}
      >
        <Text>Type</Text>
      </View>
      <View
        className="bg-white"
        style={{
          paddingHorizontal: RFPercentage(2),
          paddingVertical: RFPercentage(2),
          marginBottom: RFPercentage(1),
        }}
      >
        <FlatList
          data={arr}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                checkedHandle(item);
              }}
              key={item.id}
            >
              <View
                className="justify-start items-center flex-row"
                style={{ marginBottom: RFPercentage(1) }}
              >
                {checked === item.id ? (
                  <CheckBoxIcon color={"#ef473a"} size={RFPercentage(4)} />
                ) : (
                  <SquareIcon color={"#ef473a"} size={RFPercentage(4)} />
                )}

                <Text className="text-black">{item.heading}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View
        className="bg-white"
        style={{
          paddingHorizontal: RFPercentage(2),
          paddingVertical: RFPercentage(1),
        }}
      >
        <TextInput
          numberOfLines={4}
          placeholder="Please describe your problem (at least 6 characters)"
        />
        <View className="justify-end items-end">
          <TouchableOpacity
            className="bg-[#ef473a] items-center "
            style={{
              width: RFPercentage(12),
              borderRadius: RFPercentage(1),
              paddingHorizontal: RFPercentage(2),
              paddingVertical: RFPercentage(1),
            }}
          >
            <Text className="text-white" style={{ fontSize: RFPercentage(2) }}>
              Send
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
