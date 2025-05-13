
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logoutUser } = registerSlice.actions;

export default registerSlice.reducer;
