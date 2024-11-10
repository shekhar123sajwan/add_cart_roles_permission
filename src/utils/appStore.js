import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import configSLice from "./configSlice";

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    config: configSLice,
  },
});

export default appStore;
