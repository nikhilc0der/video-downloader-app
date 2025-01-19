import { createSlice } from "@reduxjs/toolkit";

const CreateDownloadProgress = createSlice({
  name: "downloadprogress",
  initialState: [],
  reducers: {
    downloadProgress(state, action) {
      if (action.payload.fileId) {
        state.push({
          Thumbnail: action.payload.Thumbnail,
          Title: action.payload.Title,
          Progress: action.payload.Progress,
          TotalSize: action.payload.TotalSize,
          CurrentSize: action.payload.CurrentSize,
          islink: action.payload.islink,
          fileId: action.payload.fileId,
          time: action.payload.time,
          dirs: action.payload.dirs,
        });
      }
    },
    UpdateProgress(state, action) {
      const index = state.findIndex(
        (item) => item.fileId == action.payload.fileId
      );
      state[index] = {
        Thumbnail: action.payload.Thumbnail,
        Title: action.payload.Title,
        Progress: action.payload.Progress,
        TotalSize: action.payload.TotalSize,
        CurrentSize: action.payload.CurrentSize,
        islink: action.payload.islink,
        fileId: action.payload.fileId,
        time: action.payload.time,
        dirs: action.payload.dirs,
      };
    },
  },
});

export const { downloadProgress, UpdateProgress } =
  CreateDownloadProgress.actions;
export default CreateDownloadProgress.reducer;
