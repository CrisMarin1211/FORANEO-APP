import { Routes, Route } from 'react-router-dom';
import { PlanCreateView } from '../mainPages/export';
import { WeeklyPlanView } from '../mainPages/export';

function Router() {
	return (
		<Routes>
			<Route path='/' element={<PlanCreateView />} />
			<Route path='/weeklyplan' element={<WeeklyPlanView />} />
		</Routes>
	);
}

export default Router;
