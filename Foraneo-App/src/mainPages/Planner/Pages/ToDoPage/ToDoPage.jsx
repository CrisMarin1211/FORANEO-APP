import React from 'react';
import './ToDoPage.css';
import Menu from '../../components/navBar/navBar';
import ToDoList from '../../components/toDoList/toDoList';

const ToDoPage = () => {
	return (
		<>
			<Menu />
			<ToDoList />
		</>
	);
};

export default ToDoPage;
