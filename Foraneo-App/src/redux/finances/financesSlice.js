// financeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { updateGoalInFirestore, updateTotalAvailableInFirestore } from '../../services/firebaseUtils';  // Asegúrate de importar ambas funciones


// Función para obtener los datos del localStorage
const getParsedData = (key) => {
  try {
    const data = localStorage.getItem(key);
    if (data === null || data === "undefined") {
      return []; // Si no hay datos o es undefined, retornamos un array vacío
    }
    return JSON.parse(data);  // Intentamos parsear el JSON si hay datos
  } catch (error) {
    console.error(`Error parsing data from localStorage for key: ${key}`, error);
    return [];  // Retornamos un array vacío en caso de error de parseo
  }
};

// Estado inicial
const initialState = {
  expenses: getParsedData('expenses'),  // Cargar gastos del localStorage
  incomes: getParsedData('incomes'),    // Cargar ingresos del localStorage
  totalAvailable: parseFloat(localStorage.getItem('totalAvailable')) || 0,  // Cargar total disponible
  goal: JSON.parse(localStorage.getItem('goal')) || null,  // Cargar meta si existe
};

const financeSlice = createSlice({
  name: 'finances',
  initialState,
  reducers: {
    // Establecer transacciones (gastos e ingresos) y total disponible
    setTransactions: (state, action) => {
      state.expenses = action.payload.expenses;
      state.incomes = action.payload.incomes;
      state.totalAvailable = action.payload.totalAvailable;

      // Garantizamos que totalAvailable no sea negativo
      state.totalAvailable = Math.max(state.totalAvailable, 0);

      localStorage.setItem('expenses', JSON.stringify(state.expenses));
      localStorage.setItem('incomes', JSON.stringify(state.incomes));
      localStorage.setItem('totalAvailable', state.totalAvailable.toString());
    },

    // Agregar una transacción (ingreso o gasto) y actualizar el total disponible
    addTransaction: (state, action) => {
      const { transaction } = action.payload;
      if (transaction.type === 'Income') {
        state.incomes.push(transaction);
        state.totalAvailable += transaction.value;
      } else {
        state.expenses.push(transaction);
        state.totalAvailable -= transaction.value;
      }

      // Aseguramos que totalAvailable no sea negativo
      state.totalAvailable = Math.max(state.totalAvailable, 0);

      localStorage.setItem('expenses', JSON.stringify(state.expenses));
      localStorage.setItem('incomes', JSON.stringify(state.incomes));
      localStorage.setItem('totalAvailable', state.totalAvailable.toString());
    },

    // Eliminar una transacción y actualizar el total disponible
    removeTransaction: (state, action) => {
      const { transaction } = action.payload;
      if (transaction.type === 'Income') {
        state.incomes = state.incomes.filter(item => item.id !== transaction.id);
        state.totalAvailable -= transaction.value;
      } else {
        state.expenses = state.expenses.filter(item => item.id !== transaction.id);
        state.totalAvailable += transaction.value;
      }

      // Aseguramos que totalAvailable no sea negativo
      state.totalAvailable = Math.max(state.totalAvailable, 0);

      localStorage.setItem('expenses', JSON.stringify(state.expenses));
      localStorage.setItem('incomes', JSON.stringify(state.incomes));
      localStorage.setItem('totalAvailable', state.totalAvailable.toString());
    },

    // Establecer la meta (goal)
    setGoal: (state, action) => {
      state.goal = action.payload.goal;
      localStorage.setItem('goal', JSON.stringify(state.goal));
    },

    // Actualizar la meta, restando el dinero ingresado del total disponible y actualizando remaining
updateGoal: (state, action) => {
   if (state.goal) {
      const amount = action.payload.amount;
      state.goal.totalContributed += amount;
      state.goal.remaining = state.goal.value - state.goal.totalContributed;

      // Actualizamos el total disponible en Redux
      state.totalAvailable -= amount;
      state.totalAvailable = Math.max(state.totalAvailable, 0);

      // Guardar los cambios en localStorage y Firestore
      localStorage.setItem('totalAvailable', state.totalAvailable.toString());
      localStorage.setItem('goal', JSON.stringify(state.goal));

      // Actualizar en Firestore también
      updateGoalInFirestore(state.goal);
      updateTotalAvailableInFirestore(amount); // Actualiza Firestore con el cambio
   }
},


    // Eliminar la meta
    removeGoal: (state) => {
      state.goal = null;
      localStorage.removeItem('goal');
    },
  },
});

// Exportar las acciones generadas por createSlice
export const { setTransactions, addTransaction, removeTransaction, setGoal, updateGoal, removeGoal } = financeSlice.actions;

// Exportar el reducer
export default financeSlice.reducer;
