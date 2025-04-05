import { useState } from 'react';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import CalendarPage from './mainPages/Planner/Pages/CalendarPage/CalendarPage';
import ToDoPage from './mainPages/Planner/Pages/ToDoPage/ToDoPage';
import EmotionTracker from './mainPages/Planner/Pages/EmotionTrackerPage/EmotionTracker';

const App = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<EmotionTracker />} />
			<Route path='/calendar' element={<CalendarPage />} />
			<Route path='/to-do' element={<ToDoPage />} />
		</Routes>
	</BrowserRouter>
);

export default App;
