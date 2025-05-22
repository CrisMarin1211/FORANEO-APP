// utils/auth.js

export const isAuthenticated = () => {
  return localStorage.getItem('authenticated') === 'true';
}

export const login = () => {
  localStorage.setItem('authenticated', 'true'); // Marcamos al usuario como autenticado
}

export const logout = () => {
  localStorage.removeItem('authenticated');
  localStorage.removeItem('user'); // También removemos la información del usuario
}
