import React from 'react';
import './ToDoPage.css';
import Menu from '../../components/navBar/navBar';
import ToDoList from '../../components/toDoList/toDoList';
import SummaryEmotions from '../../components/summaryEmotions/summaryEmotions';

const ToDoPage = () => {
	return (
		<>
			<h2 className='title-page'>Mood Tracker</h2>
			<Menu />
			<SummaryEmotions />
			<ToDoList />
		</>
	);
};

export default ToDoPage;
