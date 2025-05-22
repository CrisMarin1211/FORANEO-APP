import React from 'react';
import './ToDoPage.css';
import Menu from '../../components/navBar/navBar';
import ToDoList from '../../components/toDoList/toDoList';
import SummaryEmotions from '../../components/summaryEmotions/summaryEmotions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ToDoPage = () => {
	const navigate = useNavigate();
	const handlerBackClick = () => {
		navigate('/emotions');
	};
	return (
		<>
			<Menu />
			<section className='todo-back-container'>
				<button className='back-button' onClick={handlerBackClick}>
					<FontAwesomeIcon icon={faChevronLeft} className='icon-arrow' />
				</button>
			</section>
			<h2 className='title-page'>Mood Tracker</h2>
			<SummaryEmotions />
			<ToDoList />
		</>
	);
};

export default ToDoPage;
