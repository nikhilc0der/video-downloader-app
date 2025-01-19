import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import TopDrawerViewArea from "./TopDrawerViewArea";
import { View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import BottomTabs from "./BottomTabs";
import { ScrollView } from "react-native-gesture-handler";

const UserView = ({ navigation, ...props }) => {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView edges={["top"]} />
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <TopDrawerViewArea navigation={navigation} />
            <DrawerContentScrollView>
              <DrawerItemList {...props} />
            </DrawerContentScrollView>
          </ScrollView>
          <BottomTabs navigation={navigation} />
        </View>
      </SafeAreaProvider>
    </>
  );
};

export default UserView;
