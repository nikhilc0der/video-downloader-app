import { configureStore } from "@reduxjs/toolkit";
import CreateTabSlice from "../CreateTabSlice";
import CreateDownloadProgress from "../CreateDownloadProgress";
import CreateLinkSave from "../CreateLinkSave";
import CreateHistory from "../CreateHistory";
import CollectionHistory from "../CollectionHistory";

export default allStore = configureStore({
  reducer: {
    addtabs: CreateTabSlice,
    addprogress: CreateDownloadProgress,
    addlink: CreateLinkSave,
    addHistory: CreateHistory,
    collection: CollectionHistory,
  },
});
