import React from 'react';
import './CalendarPage.css';
import Menu from '../../components/navBar/navBar';
import Calendar from '../../components/calendar/calendar';

const CalendarPage = () => {
	return (
		<>
			<Menu />
			<section className='calendar-back-container'>
				<button className='back-button'></button>
			</section>
			<Calendar />
		</>
	);
};

export default CalendarPage;
