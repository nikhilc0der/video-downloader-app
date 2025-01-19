import { createSlice } from "@reduxjs/toolkit";
import HistoryItem from "../javascript/HistoryItem";
const CollectionHistory = createSlice({
  name: "collectionItem",
  initialState: {
    collectionItem: [],
  },
  reducers: {
    alreadyCollection(state, action) {
      state.collectionItem = action.payload;
    },
    addToCollection(state, action) {
      state.collectionItem.push(action.payload);
      HistoryItem(state.collectionItem, "CollectionItems");
    },
    addToCollectionWithoutData(state, action) {
      state.collectionItem.push(action.payload);
      HistoryItem(state.collectionItem, "CollectionItems");
    },
    UpdateCollection(state, action) {
      const index = state.collectionItem.findIndex(
        (item) => item.id == action.payload.id
      );
      if (index !== -1) {
        state.collectionItem[index] = action.payload;
        HistoryItem(state.collectionItem, "CollectionItems");
      } else {
        console.log("No Item Found!");
      }
    },
    removeFromFiles(state, action) {
      const ind = state.collectionItem.findIndex(
        (item) => item.id == action.payload.id
      );
      const index = state.collectionItem[ind].collectionArray.findIndex(
        (item) => item.newUrl == action.payload.newUrl
      );
      if (index > -1) {
        state.collectionItem[ind].collectionArray.splice(index, 1);
        HistoryItem(state.collectionItem, "CollectionItems");
      }
    },
    removeFromCollection(state, action) {
      const index = state.collectionItem.findIndex(
        (item) => item.id == action.payload.id
      );
      if (index > -1) {
        state.collectionItem.splice(index, 1);
        HistoryItem(state.collectionItem, "CollectionItems");
      }
    },
  },
});
export const {
  alreadyCollection,
  addToCollection,
  UpdateCollection,
  removeFromCollection,
  addToCollectionWithoutData,
  removeFromFiles,
} = CollectionHistory.actions;
export default CollectionHistory.reducer;
