import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function HistoryItem(historyArray, value) {
  try {
    await AsyncStorage.setItem(value, JSON.stringify(historyArray));
  } catch (e) {
    console.log(
      "error occured while storing shortlist products in the async storage",
      e
    );
  }
}
