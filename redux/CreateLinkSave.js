import { createSlice } from "@reduxjs/toolkit";

const CreateLinkSave = createSlice({
  name: "createtab",
  initialState: {
    link: "homescreen",
  },

  reducers: {
    linkStore(state, action) {
      state.link = action.payload;
    },
  },
});

export const { linkStore } = CreateLinkSave.actions;
export default CreateLinkSave.reducer;
