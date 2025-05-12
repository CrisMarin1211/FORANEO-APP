import React from 'react'; // React es necesario para JSX
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Este componente protegerá las rutas que requieren autenticación
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.register.user); // Accedemos al estado del usuario desde Redux

  if (!user) {
    // Si no hay un usuario, redirigimos a login
    return <Navigate to="/login" />;
  }

  // Si está autenticado, renderizamos los children (el componente recibido)
  return children;
};

export default ProtectedRoute;
