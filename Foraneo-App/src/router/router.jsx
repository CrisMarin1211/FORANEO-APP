import { Routes, Route } from 'react-router-dom';
import { SignInView, LogInView } from '../mainPages/export'; // ✅ Asegúrate de que LogInView está bien importado

function Router() {
	return (
		<Routes>
			<Route path='/' element={<SignInView />} />
			<Route path='/login' element={<LogInView />} />
		</Routes>
	);
}

export default Router;
