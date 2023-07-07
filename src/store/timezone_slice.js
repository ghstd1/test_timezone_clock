import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timezones_list: []
};

export const timezonesSlice = createSlice({
  name: "timezonesList",
  initialState,
  reducers: {
    addTimezones: (state, action) => {
      state.timezones_list = action.payload;
    }
  }
})

export const { addTimezones } = timezonesSlice.actions;

export default timezonesSlice.reducer;