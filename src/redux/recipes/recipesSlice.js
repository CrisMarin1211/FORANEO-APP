import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weeklyPlan: [],
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setWeeklyPlan: (state, action) => {
      state.weeklyPlan = action.payload;
    },
    clearWeeklyPlan: (state) => {
      state.weeklyPlan = [];
    },
  },
});

export const { setWeeklyPlan, clearWeeklyPlan } = recipesSlice.actions;
export default recipesSlice.reducer;
