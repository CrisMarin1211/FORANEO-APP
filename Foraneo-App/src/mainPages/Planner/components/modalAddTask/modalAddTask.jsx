import React, { useEffect, useRef, useState } from 'react';
import './modalAddTask.css';

const ModalAddTask = ({ onClose, onAdd }) => {
	const [task, setTask] = useState('');

	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handlerSubmit = (event) => {
		event.preventDefault();
		if (task.trim()) {
			onAdd(task);
			setTask('');
			onClose();
		}
	};

	return (
		<>
			<section className='modal-overlay'>
				<div className='modal-content'>
					<h2>Add Task</h2>
					<form onSubmit={handlerSubmit}>
						<input
							type='text'
							placeholder='Write your task'
							value={task}
							onChange={(e) => setTask(e.target.value)}
						></input>
						<div className='modal-buttons'>
							<button type='submit'>Save</button>
							<button type='button' onClick={onClose} className='cancel-btn'>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</section>
		</>
	);
};

export default ModalAddTask;
