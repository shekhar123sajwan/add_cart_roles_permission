import { createSlice } from "@reduxjs/toolkit";

const configSLice = createSlice({
  name: "config",
  initialState: {
    theme: "light",
    language: "en",
    showFilterPanel: false,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleFilterPanel: (state, action) => {
      state.showFilterPanel = !state.showFilterPanel;
    },
  },
});

export const { setTheme, toggleFilterPanel } = configSLice.actions;
export default configSLice.reducer;
