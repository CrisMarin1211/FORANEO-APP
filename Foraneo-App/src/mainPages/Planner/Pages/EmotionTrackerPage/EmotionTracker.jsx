import React from 'react';
import './EmotionTracker.css';
import Menu from '../../components/navBar/navBar';
import DayFeedbackCard from '../../components/dayFeedbackCard/dayFeedbackCard';
import ModalSaveEmotions from '../../components/modalSaveEmotions/modalSaveEmotions';

const EmotionTracker = () => {
	return (
		<div className='content'>
			<Menu />
			<DayFeedbackCard />
			<ModalSaveEmotions />
		</div>
	);
};

export default EmotionTracker;
