import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter
import './App.css';
import Router from './router/router';

function App() {
	return (
		<BrowserRouter>
			<section>
				<Router />
			</section>
		</BrowserRouter>
	);
}

export default App;
