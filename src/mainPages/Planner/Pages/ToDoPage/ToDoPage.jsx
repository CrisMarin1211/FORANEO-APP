import React from 'react';
import './ToDoPage.css';
import Menu from '../../components/navBar/navBar';
import ToDoList from '../../components/toDoList/toDoList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ToDoPage = () => {
	const navigate = useNavigate();
	const handlerBackClick = () => {
		navigate('/calendar');
	};
	return (
		<>
			<Menu />
			<section className='todo-back-container'>
				<section className='back-button' onClick={handlerBackClick}>
					<FontAwesomeIcon icon={faChevronLeft} className='icon-arrow' />
				</section>
			</section>

			<ToDoList />
		</>
	);
};

export default ToDoPage;
