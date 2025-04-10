import { Routes, Route } from 'react-router-dom';
import CalendarPage from '../mainPages/Planner/Pages/CalendarPage/CalendarPage';
import ToDoPage from '../mainPages/Planner/Pages/ToDoPage/ToDoPage';
import EmotionTracker from '../mainPages/Planner/Pages/EmotionTrackerPage/EmotionTracker';

function Router() {
	return (
		<Routes>
			<Route path='/emotions' element={<EmotionTracker />} />
			<Route path='/calendar' element={<CalendarPage />} />
			<Route path='/to-do' element={<ToDoPage />} />
		</Routes>
	);
}

export default Router;
