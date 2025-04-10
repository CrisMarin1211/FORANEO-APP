import React from 'react';
import './CalendarPage.css';
import Menu from '../../components/navBar/navBar';
import Calendar from '../../components/calendar/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const CalendarPage = () => {
	const navigate = useNavigate();
	const handlerBackClick = () => {
		navigate('/to-do');
	};
	return (
		<>
			<Menu />
			<section className='calendar-back-container'>
				<button className='back-button' onClick={handlerBackClick}>
					<FontAwesomeIcon icon={faChevronLeft} />
				</button>
			</section>
			<Calendar />
		</>
	);
};

export default CalendarPage;
