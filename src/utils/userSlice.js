import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    rememberMe: false,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    toggleRememberMe: (state) => {
      state.rememberMe = !state.rememberMe;
    },
  },
});

export const { login, logout, toggleRememberMe } = userSlice.actions;
export default userSlice.reducer;
