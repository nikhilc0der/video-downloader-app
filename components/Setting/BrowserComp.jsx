import { View, Text, Pressable, Alert, Linking } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { FlatList } from "react-native-gesture-handler";
import Settingdata from "../../constants/Settingdata";
import { useNavigation } from "@react-navigation/native";

export default function BrowserComp() {
  const navigation = useNavigation();
  function handlerSetting(heading) {
    if (heading == "Privacy Policy") {
      Linking.openURL("https://videodownloaderbest.com/privacy");
    } else if (heading == "Terms & Conditions") {
      Linking.openURL("https://videodownloaderbest.com/termsofuse");
    } else if (heading == "How to Download") {
      navigation.navigate("Slider");
    } else if (heading == "Feedback") {
      navigation.navigate("Feedback");
    }
  }
  return (
    <FlatList
      data={Settingdata}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        rowGap: RFPercentage(0.5),
        padding: RFPercentage(0.5),
      }}
      renderItem={({ item, index }) => (
        <View
          style={{
            marginHorizontal: RFPercentage(2),
          }}
          key={index}
        >
          <Text className="text-[#ef473a]">{item.heading}</Text>
          <FlatList
            data={item.arr}
            renderItem={({ item }) => (
              <View
                className={`flex-row justify-between items-center border-b border-[#bdbdbd]`}
                style={{ paddingVertical: RFPercentage(2) }}
              >
                <Pressable
                  className=" w-[100%]"
                  onPress={() => handlerSetting(item.heading)}
                >
                  <Text style={{ fontSize: RFPercentage(2) }}>
                    {item.heading}
                  </Text>
                  <Text style={{ fontSize: RFPercentage(1.5) }}>
                    {item.subHeading}
                  </Text>
                </Pressable>
              </View>
            )}
          />
        </View>
      )}
    />
  );
}
