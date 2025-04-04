import React from 'react';
import './EmotionTracker.css';
import Menu from '../../components/navBar/navBar';
import ListEmotions from '../../components/listEmotions/listEmotions';
import { emotionsData, hobbiesData, peopleData, weatherData, healthData, eventsData } from '../../data/iconsData';
import ModalSaveEmotions from '../../components/modalSaveEmotions/modalSaveEmotions';
import DayFeedbackCard from '../../components/dayFeedbackCard/dayFeedbackCard';

const EmotionTracker = () => {
	return (
		<>
			<Menu />
			<DayFeedbackCard />
			<ListEmotions title='Emotions' emotions={emotionsData} />
			<ListEmotions title='People' emotions={peopleData} />
			<ListEmotions title='Weather' emotions={weatherData} />
			<ListEmotions title='Hobbies' emotions={hobbiesData} />
			<ListEmotions title='Events' emotions={eventsData} />
			<ListEmotions title='Health' emotions={healthData} />
			<ModalSaveEmotions />
		</>
	);
};

export default EmotionTracker;
