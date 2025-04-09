import React, { useEffect, useState } from 'react';
import './EmotionTracker.css';
import Menu from '../../components/navBar/navBar';
import ListEmotions from '../../components/listEmotions/listEmotions';
import { emotionsData, hobbiesData, peopleData, weatherData, healthData, eventsData } from '../../data/iconsData';
import ModalSaveEmotions from '../../components/modalSaveEmotions/modalSaveEmotions';
import DayFeedbackCard from '../../components/dayFeedbackCard/dayFeedbackCard';
import { useLocation, useNavigate } from 'react-router-dom';

const EmotionTracker = () => {
	const [allSelections, setAllSelections] = useState({});
	const [dayMood, setDayMood] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const incomingDate = location.state?.selectedDate;
		const today = new Date().toISOString().split('T')[0];
	});

	const handlerSelectionChange = (title, selectItems) => {
		setAllSelections((prev) => ({ ...prev, [title]: selectItems }));
	};

	const handlerSaveAll = () => {
		if (!dayMood) {
			alert('It is mandatory to select an emotion');
			return;
		}
		Object.entries(allSelections).forEach(([title, items]) => {
			const key = `emotions_${title}`;
			if (items.length > 0) {
				localStorage.setItem(key, JSON.stringify(items));
			} else {
				localStorage.removeItem(key);
			}
		});

		const today = new Date().toISOString().split('T')[0];
		const existingFeedbacks = JSON.parse(localStorage.getItem('day-feedbacks')) || {};
		existingFeedbacks[today] = dayMood;
		localStorage.setItem('day-feedbacks', JSON.stringify(existingFeedbacks));

		setShowModal(true);
	};

	const goToCalendar = () => {
		navigate('/calendar');
	};

	return (
		<>
			<Menu />
			<section className='selected-date-header'>
				<span></span>
				<span className='date-arrow-icon' onClick={goToCalendar}>
					▼
				</span>
			</section>
			<DayFeedbackCard onSelect={setDayMood} date={today} />
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
