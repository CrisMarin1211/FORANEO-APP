import React from 'react';
import './toDoList.css';

const ToDoList = () => {
	return (
		<>
			<div className='todo-container'>
				<h2 className='todo-title'>TO-DO</h2>
				<div className='task-list'>
					<div className='task-item'>
						<span className='task-text'>Do HCI homework</span>
						<button className='task-status'>Not started</button>
					</div>
				</div>
				<button className='new-task-btn'>+ New Task</button>
			</div>
		</>
	);
};

export default ToDoList;
