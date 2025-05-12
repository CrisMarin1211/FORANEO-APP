import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Importa el Provider de react-redux
import { store } from './redux/store'; // Importa el store de Redux
import App from './App'; // Importa el componente App
import './index.css'

// Asegúrate de que todo esté envuelto en el Provider
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* Aquí envuelves tu aplicación en el Provider */}
    <App />
  </Provider>
);
