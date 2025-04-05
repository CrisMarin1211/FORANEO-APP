import React, { useState } from 'react';
import './EmotionTracker.css';
import Menu from '../../components/navBar/navBar';
import ListEmotions from '../../components/listEmotions/listEmotions';
import { emotionsData, hobbiesData, peopleData, weatherData, healthData, eventsData } from '../../data/iconsData';
import ModalSaveEmotions from '../../components/modalSaveEmotions/modalSaveEmotions';
import DayFeedbackCard from '../../components/dayFeedbackCard/dayFeedbackCard';

const EmotionTracker = () => {
	const [allSelections, setAllSelections] = useState({});
	const [showModal, setShowModal] = useState(false);

	const handlerSelectionChange = (title, selectItems) => {
		setAllSelections((prev) => ({ ...prev, [title]: selectItems }));
	};

	const handlerSaveAll = () => {
		Object.entries(allSelections).forEach(([title, items]) => {
			const key = `emotions_${title}`;
			if (items.length > 0) {
				localStorage.setItem(key, JSON.stringify(items));
			} else {
				localStorage.removeItem(key);
			}
		});

		setShowModal(true);
	};

	return (
		<>
			<Menu />
			<DayFeedbackCard />
			<ListEmotions title='Emotions' emotions={emotionsData} onSelectionChange={handlerSelectionChange} />
			<ListEmotions title='People' emotions={peopleData} onSelectionChange={handlerSelectionChange} />
			<ListEmotions title='Weather' emotions={weatherData} onSelectionChange={handlerSelectionChange} />
			<ListEmotions title='Hobbies' emotions={hobbiesData} onSelectionChange={handlerSelectionChange} />
			<ListEmotions title='Events' emotions={eventsData} onSelectionChange={handlerSelectionChange} />
			<ListEmotions title='Health' emotions={healthData} onSelectionChange={handlerSelectionChange} />
			<div className='save-emotions-wrapper'>
				<button className='save-emotions-btn' onClick={handlerSaveAll}>
					Confirm
				</button>
			</div>
			{showModal && <ModalSaveEmotions onClose={() => setShowModal(false)} />}
		</>
	);
};

export default EmotionTracker;
