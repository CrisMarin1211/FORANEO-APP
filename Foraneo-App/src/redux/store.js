
import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './signIn/registerSlice';
import financeReducer from './finances/financesSlice';


export const store = configureStore({
  reducer: {
    register: registerReducer,
    finances: financeReducer,
  },
});


export { setUser, logoutUser } from './signIn/registerSlice';
export { setTransactions, addTransaction, removeTransaction } from './finances/financesSlice';
