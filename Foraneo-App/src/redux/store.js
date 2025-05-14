import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./signIn/registerSlice";
import financeReducer from "./finances/financesSlice";
import recipesReducer from "./recipes/recipesSlice";

export const store = configureStore({
  reducer: {
    register: registerReducer,
    finances: financeReducer,
    recipes: recipesReducer,
  },
});

export { setUser, logoutUser } from "./signIn/registerSlice";
export {
  setTransactions,
  addTransaction,
  removeTransaction,
} from "./finances/financesSlice";
