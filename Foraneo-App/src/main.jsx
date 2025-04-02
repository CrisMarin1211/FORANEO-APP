import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import EmotionTracker from './Pages/EmotionTrackerPage/EmotionTracker.jsx';
import ToDoPage from './Pages/ToDoPage/ToDoPage.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<EmotionTracker />
		<ToDoPage />
	</StrictMode>
);
