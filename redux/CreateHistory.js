import { createSlice } from "@reduxjs/toolkit";
import HistoryItem from "../javascript/HistoryItem";
const HistorySlice = createSlice({
  name: "historyItems",
  initialState: {
    historyItems: [],
  },
  reducers: {
    alreadyHistoryItems(state, action) {
      state.historyItems = action.payload;
    },
    addToHistory(state, action) {
      state.historyItems.push(action.payload);
      HistoryItem(state.historyItems, "historyItems");
    },
    removeFromHistory(state, action) {
      const index = state.historyItems.findIndex(
        (item) => item.dirs == action.payload.videolink
      );
      if (index > -1) {
        state.historyItems.splice(index, 1);
        HistoryItem(state.historyItems, "historyItems");
      }
    },
    MultiDeleteHistory(state, action) {
      let selected = action.payload.filter((item) => !item.status);
      HistoryItem((state.historyItems = selected), "historyItems");
    },
    allDeleteHistory(state, action) {
      HistoryItem((state.historyItems = action.payload), "historyItems");
    },
  },
});
export const {
  addToHistory,
  alreadyHistoryItems,
  removeFromHistory,
  MultiDeleteHistory,
  allDeleteHistory,
} = HistorySlice.actions;
export default HistorySlice.reducer;
// -1709635674
