import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const toDoSlice = createSlice({
  name: 'toDo',
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
    },
    updateTask(state, action) {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const { setTasks, addTask, removeTask, updateTask } = toDoSlice.actions;
export default toDoSlice.reducer;
