import { configureStore } from "@reduxjs/toolkit";
import timezoneReducer from "./timezone_slice";

export const store = configureStore({
  reducer: {
    timezone_list: timezoneReducer
  },
})