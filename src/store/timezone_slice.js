import { createSlice } from "@reduxjs/toolkit";

// инициализируем начальное состояние хранилища
const initialState = {
  timezones_list: []
};

// создаем срез хранилища для списка часовых поясов
export const timezonesSlice = createSlice({
  // указываем имя среза
  name: "timezonesList",

  // передаем начальное состояние хранилища
  initialState,
  reducers: {
    // создаем обработчик для добавления списка часовых поясов в хранилище
    addTimezones: (state, action) => {
      // обновляем список часовых поясов в хранилище
      state.timezones_list = action.payload;
    }
  }
})

// экспортируем обработчик добавления списка часовых поясов
export const { addTimezones } = timezonesSlice.actions;

// экспортируем редьюсер для списка часовых поясов
export default timezonesSlice.reducer;