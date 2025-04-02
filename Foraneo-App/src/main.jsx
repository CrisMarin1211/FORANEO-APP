import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import EmotionTracker from './Pages/EmotionTrackerPage/EmotionTracker.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<EmotionTracker />
	</StrictMode>
);
