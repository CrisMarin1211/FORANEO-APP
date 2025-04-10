import React from 'react';
import './ToDoPage.css';
import Menu from '../../components/navBar/navBar';
import ToDoList from '../../components/toDoList/toDoList';
import SummaryEmotions from '../../components/summaryEmotions/summaryEmotions';

const ToDoPage = () => {
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
