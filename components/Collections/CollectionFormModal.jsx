import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";
import { CrossIcon } from "../../Icons";
import { useDispatch } from "react-redux";
import { addToCollectionWithoutData } from "../../redux/CollectionHistory";

export default function CollectionFormModal({ isCollection, setCollection }) {
  const [collectionValue, setCollectionValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 2000);
  }, [errorMessage]);
  const dispatch = useDispatch();
  let id = new Date().getTime();
  const handleSubmit = () => {
    if (collectionValue) {
      dispatch(
        addToCollectionWithoutData({
          id: id,
          collectionName: collectionValue,
          collectionArray: [],
        })
      );
      setCollection(false);
    } else {
      setErrorMessage("Please Enter Name Of Your Collection");
    }
  };
  return (
    <>
      <View
        className={`absolute top-0 w-full h-full opacity-50 bg-black ${
          isCollection ? "flex-col" : "hidden"
        }`}
        style={{ zIndex: 101 }}
      ></View>

      <View style={{ zIndex: 110 }}>
        <Modal visible={isCollection} animationType="slide" transparent={true}>
          <View className="w-full h-full justify-center items-center">
            <View
              className="bg-gray-200 rounded-2xl"
              style={{ width: RFPercentage(40) }}
            >
              <View
                className="border-gray-300"
                style={{
                  padding: RFPercentage(3),
                  borderBottomWidth: RFPercentage(0.1),
                }}
              >
                <Text
                  className="text-gray-800 text-center font-bold"
                  style={{
                    marginTop: RFPercentage(0.5),
                    fontSize: RFPercentage(2),
                  }}
                >
                  Collection Name
                </Text>
              </View>
              <View
                className="w-[90%] mx-auto rounded-xl flex-row items-center bg-gray-300"
                style={{
                  marginTop: RFPercentage(1.5),
                  marginBottom: RFPercentage(1.5),
                  padding: RFPercentage(2),
                }}
              >
                <TextInput
                  style={{ fontSize: RFPercentage(2) }}
                  value={collectionValue}
                  onChangeText={setCollectionValue}
                  numberOfLines={1}
                  className="flex-1 font-semibold overflow-hidden"
                  placeholder="Enter the Collection Name"
                  placeholderTextColor={"#000"}
                />
                {collectionValue && (
                  <TouchableOpacity onPress={() => setCollectionValue("")}>
                    <CrossIcon color={"#000"} size={RFPercentage(3)} />
                  </TouchableOpacity>
                )}
              </View>
              {errorMessage && (
                <Text
                  className="text-red-500 text-center"
                  style={{ marginBottom: RFPercentage(1.5) }}
                >
                  {errorMessage}
                </Text>
              )}
              <View
                className="border-gray-300 flex-row"
                style={{
                  borderTopWidth: RFPercentage(0.1),
                }}
              >
                <View
                  className="w-1/2 border-gray-300"
                  style={{
                    padding: RFPercentage(2),
                    borderRightWidth: RFPercentage(0.1),
                  }}
                >
                  <TouchableOpacity onPress={() => setCollection(false)}>
                    <Text
                      className="text-center font-extrabold text-sky-700"
                      style={{ fontSize: RFPercentage(2) }}
                    >
                      cancel
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="w-1/2" style={{ padding: RFPercentage(2) }}>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Text
                      className="text-center font-extrabold"
                      style={{
                        fontSize: RFPercentage(2),
                        color: "red",
                      }}
                    >
                      Save
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}
