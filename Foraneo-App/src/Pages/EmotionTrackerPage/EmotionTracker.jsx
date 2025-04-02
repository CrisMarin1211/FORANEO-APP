import React from 'react';
import './EmotionTracker.css';
import Menu from '../../components/navBar/navBar';
import DayFeedbackCard from '../../components/dayFeedbackCard/dayFeedbackCard';

const EmotionTracker = () => {
	return (
		<div className='content'>
			<Menu />
			<DayFeedbackCard />
		</div>
	);
};

export default EmotionTracker;
