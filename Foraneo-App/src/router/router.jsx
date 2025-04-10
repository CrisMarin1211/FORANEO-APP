import { Routes, Route } from 'react-router-dom';
import {
	SignInView,
	LogInView,
	MainView,
	FinancesView,
	AddView,
	EmotionTrackerView,
	CalendarPageView,
	ToDoPageView,
} from '../mainPages/export';

function Router() {
	return (
		<Routes>
			<Route path='/' element={<SignInView />} />
			<Route path='/login' element={<LogInView />} />
			<Route path='/main' element={<MainView />} />
			<Route path='/finances' element={<FinancesView />} />
			<Route path='/add' element={<AddView />} />
			<Route path='/emotions' element={<EmotionTrackerView />} />
			<Route path='/calendar' element={<CalendarPageView />} />
			<Route path='/to-do' element={<ToDoPageView />} />
		</Routes>
	);
}

export default Router;
