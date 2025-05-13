import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './router/router';
import { useDispatch } from 'react-redux';
import { setUser, logoutUser } from './redux/store';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = getAuth();


    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);

      if (user) {

        dispatch(setUser({
          uid: user.uid,
          email: user.email,
        }));
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
        }));
      } else {

        dispatch(logoutUser());
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
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
