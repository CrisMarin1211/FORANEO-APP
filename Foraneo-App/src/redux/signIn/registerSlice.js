// src/redux/signIn/registerSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Estado inicial
const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null, // Intentar cargar el usuario desde localStorage
};

// Crear el slice
const registerSlice = createSlice({
  name: 'register', // Nombre del slice
  initialState, // Estado inicial
  reducers: {
    // Acción para establecer al usuario en el estado
    setUser: (state, action) => {
      state.user = action.payload; // Aquí guardamos la información del usuario en el estado
    },

    // Acción para eliminar al usuario del estado (cuando se cierre sesión)
    logoutUser: (state) => {
      state.user = null; // Borrar la información del usuario del estado
    },
  },
});

// Exportar las acciones
export const { setUser, logoutUser } = registerSlice.actions;

// Exportar el reducer para usarlo en el store
export default registerSlice.reducer;
