import React, { useState } from 'react';
import './modalSaveEmotions.css';
import { useNavigate } from 'react-router-dom';

const ModalSaveEmotions = ({ onClose }) => {
	const navigate = useNavigate();

	const handlerContinue = () => {
		onClose();
		navigate('/to-do');
	};

	return (
		<>
			<section className='modal-overlay'>
				<section className='modal-content'>
					<button className='close-button' onClick={onClose}>
						X
					</button>
					<h2 className='modal-title'>Congratulations!</h2>
					<p className='modal-description'>Congrats, you have registered your first day!</p>
					<img src='/images/emotionsIcons.png' alt='emotions icons' className='modal-image'></img>
					<button className='modal-button' onClick={handlerContinue}>
						Continue
					</button>
				</section>
			</section>
		</>
	);
};

export default ModalSaveEmotions;
