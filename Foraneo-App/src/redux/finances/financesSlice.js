import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateGoalInFirestore,
  updateTotalAvailableInFirestore,
  saveTransactionToFirestore,
  removeTransactionFromFirestore,
  getTransactionsFromFirestore,
  saveGoalToFirestore,
  getUserDataFromFirestore,
  removeGoalFromFirestore,
} from "../../services/firebaseUtils";

const initialState = {
  expenses: [],
  incomes: [],
  totalAvailable: 0,
  goal: null,
};

export const addTransactionAsync = createAsyncThunk(
  "finances/addTransactionAsync",
  async (transaction, { dispatch }) => {
    await saveTransactionToFirestore(transaction);
    await dispatch(fetchTransactionsAsync());
  }
);

export const removeTransactionAsync = createAsyncThunk(
  "finances/removeTransactionAsync",
  async (transaction, { dispatch }) => {
    await removeTransactionFromFirestore(transaction);
    await dispatch(fetchTransactionsAsync());
  }
);

export const fetchTransactionsAsync = createAsyncThunk(
  "finances/fetchTransactionsAsync",
  async (_, { dispatch }) => {
    const data = await getTransactionsFromFirestore();
    if (data) {
      dispatch(setTransactions(data));
    }
  }
);

function serializeGoalDates(goal) {
  if (!goal) return goal;
  const convert = (d) =>
    d && typeof d.toDate === "function" ? d.toDate().toISOString() : d;
  return {
    ...goal,
    startDate: convert(goal.startDate),
    endDate: convert(goal.endDate),
  };
}

export const setGoalAsync = createAsyncThunk(
  "finances/setGoalAsync",
  async (goal, { dispatch }) => {
    await saveGoalToFirestore(goal);
    const serializedGoal = serializeGoalDates(goal);
    dispatch(setGoal({ goal: serializedGoal }));
  }
);

export const fetchGoalAsync = createAsyncThunk(
  "finances/fetchGoalAsync",
  async (_, { dispatch }) => {
    const userData = await getUserDataFromFirestore();
    if (userData && userData.goal) {
      const serializedGoal = serializeGoalDates(userData.goal);
      dispatch(setGoal({ goal: serializedGoal }));
    }
  }
);

export const removeGoalAsync = createAsyncThunk(
  "finances/removeGoalAsync",
  async (_, { dispatch }) => {
    await removeGoalFromFirestore();
    dispatch(removeGoal());
  }
);

const financeSlice = createSlice({
  name: "finances",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      state.expenses = action.payload.expenses;
      state.incomes = action.payload.incomes;
      state.totalAvailable = action.payload.totalAvailable;
    },

    addTransaction: (state, action) => {
      const { transaction } = action.payload;
      if (transaction.type === "Income") {
        state.incomes.push(transaction);
        state.totalAvailable += transaction.value;
      } else {
        state.expenses.push(transaction);
        state.totalAvailable -= transaction.value;
      }
      state.totalAvailable = Math.max(state.totalAvailable, 0);
    },

    removeTransaction: (state, action) => {
      const { transaction } = action.payload;
      if (transaction.type === "Income") {
        state.incomes = state.incomes.filter(
          (item) => item.id !== transaction.id
        );
        state.totalAvailable -= transaction.value;
      } else {
        state.expenses = state.expenses.filter(
          (item) => item.id !== transaction.id
        );
        state.totalAvailable += transaction.value;
      }
      state.totalAvailable = Math.max(state.totalAvailable, 0);
    },

    setGoal: (state, action) => {
      state.goal = action.payload.goal;
    },

    updateGoal: (state, action) => {
      if (state.goal) {
        const amount = action.payload.amount;
        state.goal.totalContributed += amount;
        state.goal.remaining = state.goal.value - state.goal.totalContributed;
        state.totalAvailable -= amount;
        state.totalAvailable = Math.max(state.totalAvailable, 0);
        updateGoalInFirestore(state.goal);
        updateTotalAvailableInFirestore(amount);
      }
    },

    removeGoal: (state) => {
      state.goal = null;
    },
  },
});

export const {
  setTransactions,
  addTransaction,
  removeTransaction,
  setGoal,
  updateGoal,
  removeGoal,
} = financeSlice.actions;

export default financeSlice.reducer;
