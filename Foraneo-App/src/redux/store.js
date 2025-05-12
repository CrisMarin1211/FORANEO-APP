// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './signIn/registerSlice';  // Reducer para el registro de usuario
import goalReducer from './finances/goalSlice/goalSlice'; // Reducer para la gestión de la meta de ahorro
import financeReducer from './finances/financesSlice';  // Reducer para manejar las finanzas

// Configuración del store de Redux
export const store = configureStore({
  reducer: {
    register: registerReducer,
    goal: goalReducer,
    finances: financeReducer,  // Correcto: finanzas debe usar el reducer de financeSlice
  },
});

// Exportar las acciones de los slices
export { setUser, logoutUser } from './signIn/registerSlice';
export { setGoal, clearGoal } from './finances/goalSlice/goalSlice';
export { setTransactions, addTransaction, removeTransaction } from './finances/financesSlice';  // Exporta también las acciones de financeSlice
