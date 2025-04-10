import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './router/router';

function App() {
	return (
		<BrowserRouter>
			<section className='App'>
				<Router />
			</section>
		</BrowserRouter>
	);
}

export default App;
