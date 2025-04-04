import React from 'react';
import './EmotionTracker.css';
import Menu from '../../components/navBar/navBar';
import ListEmotions from '../../components/listEmotions/listEmotions';
import { emotionsData } from '../../data/iconsData';

const EmotionTracker = () => {
	return (
		<>
			<Menu />
			<ListEmotions title='Emotions' emotions={emotionsData} />
		</>
	);
};

export default EmotionTracker;
