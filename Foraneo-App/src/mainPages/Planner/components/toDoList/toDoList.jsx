import React, { useEffect, useState } from 'react';
import './toDoList.css';
import ModalAddTask from '../modalAddTask/modalAddTask';

const ToDoList = () => {
	const [showModal, setShowModal] = useState(false);

	const [tasks, setTasks] = useState(() => {
		return JSON.parse(localStorage.getItem('tasks')) || [];
	});

	const handlerAddTask = (newTask) => {
		if (!newTask.trim()) return;
		const taskExist = tasks.some((t) => t.text.toLowerCase() === newTask.toLowerCase());
		if (taskExist) return;
		const updateTasks = [...tasks, { text: newTask, status: 'Pending' }];
		setTasks(updateTasks);
	};

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	return (
		<>
			<section className='todo-container'>
				<h2 className='todo-title'>TO-DO</h2>
				<div className='task-list'>
					{tasks.map((task, index) => (
						<div className='task-item' key={index}>
							<span className='task-text'>{task.text}</span>
							<select
								className={`task-status ${task.status.toLowerCase().replace(' ', '')}`}
								value={task.status}
								onChange={(e) => {
									const updated = [...tasks];
									updated[index].status = e.target.value;
									setTasks(updated);
								}}
							>
								<option value='Pending'>Not Started</option>
								<option value='In Progress'>In Progress</option>
								<option value='Completed'>Completed</option>
							</select>
						</div>
					))}
				</div>
				<button className='new-task-btn' onClick={() => setShowModal(true)}>
					+ New Task
				</button>
			</section>
			{showModal && <ModalAddTask onClose={() => setShowModal(false)} onAdd={handlerAddTask} />}
		</>
	);
};

export default ToDoList;
