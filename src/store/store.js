import { configureStore } from "@reduxjs/toolkit";

// импортируем редьюсер timezoneReducer из файла timezone_slice.js
import timezoneReducer from "./timezone_slice";

export const store = configureStore({
  // добавляем редьюсер timezoneReducer в магазин Redux
  reducer: {
    timezone_list: timezoneReducer
  },
})