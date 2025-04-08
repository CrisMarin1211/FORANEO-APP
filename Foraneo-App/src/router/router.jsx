import { Routes, Route } from 'react-router-dom';
import { WelcomeView } from '../mainPages/export';
import { PlanCreateView } from '../mainPages/export';
import { WeeklyPlanView } from '../mainPages/export';

function Router() {
	return (
		<Routes>
			<Route path='/' element={<WelcomeView />} />
			<Route path='/plancreate' element={<PlanCreateView />} />
			<Route path='/weeklyplan' element={<WeeklyPlanView />} />
		</Routes>
	);
}

export default Router;
