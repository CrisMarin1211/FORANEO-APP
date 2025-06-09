import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./signIn/registerSlice";
import financeReducer from "./finances/financesSlice";
import recipesReducer from "./recipes/recipesSlice";
import emotionsReducer from "./planner/emotionsSlice";
import calendarReducer from "./planner/calendarSlice";
import toDoReducer from "./planner/toDoSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    finances: financeReducer,
    recipes: recipesReducer,
    emotions: emotionsReducer,
    calendar: calendarReducer,
    toDo: toDoReducer,
  },
});

export { setUser, logoutUser } from "./signIn/registerSlice";
export {
  setTransactions,
  addTransaction,
  removeTransaction,
} from "./finances/financesSlice";

