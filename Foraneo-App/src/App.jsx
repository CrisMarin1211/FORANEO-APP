import { useState } from 'react';
import './App.css';
import CalendarPage from './mainPages/Planner/Pages/CalendarPage/CalendarPage';
import ToDoPage from './mainPages/Planner/Pages/ToDoPage/ToDoPage';

function App() {
	return (
		<>
			<section className='App'>
				{/* <CalendarPage /> */}
				<ToDoPage />
			</section>
			;
		</>
	);
}

export default App;
