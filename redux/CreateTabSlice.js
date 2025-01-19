import { createSlice } from "@reduxjs/toolkit";

const CreateTabSlice = createSlice({
  name: "createtab",
  initialState: [
    {
      icon: "Earth",
      label: "HomePage",
      color: "#fff",
      link: "homescreen",
    },
  ],
  reducers: {
    addtab(state, action) {
      state.push({
        icon: action.payload.icon,
        label: action.payload.label,
        color: action.payload.color,
        link: action.payload.link,
      });
    },
    deletetab(state, action) {
      state.length !== 1 && state.splice(action.payload, 1);
    },
    changelabel(state, action) {
      state[action.payload.index] = {
        icon: action.payload.icon,
        label: action.payload.label,
        color: action.payload.color,
        link: action.payload.link,
      };
    },
  },
});

export const { addtab, deletetab, changelabel } = CreateTabSlice.actions;
export default CreateTabSlice.reducer;
