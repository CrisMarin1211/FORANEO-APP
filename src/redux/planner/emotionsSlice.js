import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emotionsByDate: {},
};

const emotionsSlice = createSlice({
  name: "emotions",
  initialState,
  reducers: {
    setEmotionsForDate(state, action) {
      const { date, data } = action.payload;
      state.emotionsByDate[date] = data;
    },
    removeEmotionsForDate(state, action) {
      delete state.emotionsByDate[action.payload];
    },
  },
});

export const { setEmotionsForDate, removeEmotionsForDate } =
  emotionsSlice.actions;
export default emotionsSlice.reducer;
