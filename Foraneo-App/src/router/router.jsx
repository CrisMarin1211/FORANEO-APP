import { Routes, Route } from 'react-router-dom';
import { SignInView, LogInView, MainView } from '../mainPages/export'; 

function Router() {
	return (
		<Routes>
			<Route path='/' element={<SignInView />} />
			<Route path='/login' element={<LogInView />} />
			<Route path='/main' element={<MainView />} />
		</Routes>
	);
}

export default Router;
