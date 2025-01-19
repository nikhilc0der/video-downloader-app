import { Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { RFPercentage } from "react-native-responsive-fontsize";
import { PlusIcon } from "../../Icons";

function CollectionScreenTopBar({ setCollection }) {
  return (
    <>
      <Text
        className="justify-center items-center font-bold text-white"
        style={{
          fontSize: RFPercentage(3),
        }}
      >
        Collections
      </Text>

      <TouchableWithoutFeedback onPress={() => setCollection(true)}>
        <View
          className="rounded-full bg-white"
          style={{ padding: RFPercentage(0.5) }}
        >
          <PlusIcon color={"#121212"} size={RFPercentage(2.8)} />
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

export default CollectionScreenTopBar;
