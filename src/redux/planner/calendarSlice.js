import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendarEvents(state, action) {
      state.events = action.payload;
    },
    clearCalendarEvents(state) {
      state.events = [];
    },
  },
});

export const { setCalendarEvents, clearCalendarEvents } = calendarSlice.actions;
export default calendarSlice.reducer;
