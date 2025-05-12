import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './router/router';
import { useDispatch } from 'react-redux';
import { setUser, logoutUser } from './redux/store'; // Importar las acciones desde store
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Importar Firebase Authentication


const App = () => {
  const [loading, setLoading] = useState(true); // Para mostrar un loading mientras verificamos la autenticación
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();

    // Verificar si el usuario está autenticado y almacenar su información en Redux/localStorage
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false); // Dejar de mostrar el loading una vez se verifique el estado de autenticación

      if (user) {
        // Guardamos el usuario en Redux y localStorage
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
        }));
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
        }));
      } else {
        // Si el usuario no está autenticado, eliminamos su información de Redux y localStorage
        dispatch(logoutUser());
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe(); // Limpiar el listener cuando el componente se desmonte
  }, [dispatch]);

  if (loading) {
    return <section>Loading...</section>;
  }

  return (
    <BrowserRouter>
      <section className="App">
        <Router />
      </section>
    </BrowserRouter>
  );
};

export default App;
