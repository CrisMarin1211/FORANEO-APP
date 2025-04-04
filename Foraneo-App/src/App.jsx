import { useState } from 'react';
import './App.css';
import CalendarPage from './mainPages/Planner/Pages/CalendarPage/CalendarPage';
import ToDoPage from './mainPages/Planner/Pages/ToDoPage/ToDoPage';
import EmotionTracker from './mainPages/Planner/Pages/EmotionTrackerPage/EmotionTracker';

function App() {
	return (
		<>
			<section className='App'>
				{/* <CalendarPage /> */}
				{/* <ToDoPage /> */}
				<EmotionTracker />
			</section>
			;
		</>
	);
}

export default App;
