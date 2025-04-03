import React from 'react';
import './CalendarPage.css';
import Menu from '../../components/navBar/navBar';
import Calendar from '../../components/calendar/calendar';

const CalendarPage = () => {
	return (
		<>
			<Menu />
			<Calendar />
		</>
	);
};

export default CalendarPage;
