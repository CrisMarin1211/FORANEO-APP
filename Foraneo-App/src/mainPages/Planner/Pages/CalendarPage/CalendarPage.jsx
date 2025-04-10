import React from 'react';
import './CalendarPage.css';
import Menu from '../../components/navBar/navBar';
import Calendar from '../../components/calendar/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CalendarPage = () => {
	return (
		<>
			<Menu />
			<section className='calendar-back-container'>
				<button className='back-button'>
					<FontAwesomeIcon icon='fa-solid fa-chevron-left' />
				</button>
			</section>
			<Calendar />
		</>
	);
};

export default CalendarPage;
