import React from 'react';
import './EmotionTracker.css';
import Menu from '../../components/navBar/navBar';
import ListEmotions from '../../components/listEmotions/listEmotions';
import { emotionsData } from '../../data/iconsData';
import ModalSaveEmotions from '../../components/modalSaveEmotions/modalSaveEmotions';
import DayFeedbackCard from '../../components/dayFeedbackCard/dayFeedbackCard';

const EmotionTracker = () => {
	return (
		<>
			<Menu />
			<DayFeedbackCard />
			<ListEmotions title='Emotions' emotions={emotionsData} />
			<ModalSaveEmotions />
		</>
	);
};

export default EmotionTracker;
